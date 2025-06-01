import { Application } from "../models/application.js";
import Job from "../models/job.js";

export const createApplication = async (req, res) => {
    try {
        const { jobId, applicantId } = req.body;

        if (!jobId || !applicantId) {
            return res.status(400).json({ message: "Job ID and Applicant ID are required" });
        }

        const existingApplication = await Application.findOne({ job: jobId, applicant: applicantId });
        if (existingApplication) {
            return res.status(400).json({ message: "You have already applied." });
        }

        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }

        const newApplication = new Application({
            job: jobId,
            applicant: applicantId
        });

        await newApplication.save();
        
        job.applications.push(newApplication._id);
        await job.save();

        res.status(201).json({ message: "Application created successfully", application: newApplication });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
        
    }
}

export const getAppliedJobs = async (req, res) => {
    try {
        const {id} = req.params; //user id
        const applications = await Application.find({applicant:id}).sort({createdAt:-1}).populate({
            path:'job',
            options:{sort:{createdAt:-1}},
            populate:{
                path:'company',
                options:{sort:{createdAt:-1}},
            }
        });
        res.status(200).json({ message: "Applications retrieved successfully", applications });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

export const getAllApplicants = async (req, res) => {
     try {
        const {id} = req.params; //job id
        const jobExists = await Job.findById(id);
        if (!jobExists) {
            return res.status(404).json({ message: "Job not found" });
        }
        const job = await Job.findById(id).populate({
            path:'applications',
            options:{sort:{createdAt:-1}},
            populate:{
                path:'applicant'
            }
        });
        return res.status(200).json({ message: "Applications retrieved successfully", applications:job.applications });
     } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
     }
}

export const updateApplication = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const application = await Application.findById(id);
        if (!application) {
            return res.status(404).json({ message: "Application not found" });
        }

        application.status = status || application.status;
        await application.save();

        res.status(200).json({ message: "Application updated successfully", application });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}