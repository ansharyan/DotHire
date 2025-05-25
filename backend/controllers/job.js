import  Job  from "../models/job.js";


export const getAllJobs = async (req, res) => {
    try {
        const jobs = await Job.find();
        return res.status(200).json({message: "Jobs fetched successfully", jobs});
    } catch (error) {
        return res.status(500).json({message: "Internal Server Error", error: error.message});
        
    }
}


export const createJob = async (req, res) => {
    try {
        const {title, description, requirements, salary, experienceLevel, location, jobType, position, company} = req.body;
        const user = req.user;

        const job = new Job({
            title,
            description,
            requirements,
            salary,
            experienceLevel,
            location,
            jobType,
            position,
            company,
            created_by: user._id
        })
        await job.save();

        return res.status(201).json({message: "Job created successfully", job});
    } catch (error) {
        return res.status(500).json({message: "Internal Server Error", error: error.message});
    }
}

export const editJob = async (req, res) => {
    try {
        const {title, description, requirements, salary, experienceLevel, location, jobType, position, company} = req.body;
        const user = req.user;
        const jobId = req.params.id;
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({message: "Job not found"});
        }
        if (job.created_by.toString() !== user._id.toString()) {
            return res.status(403).json({message: "You are not authorized to edit this job"});
        }
        job.title = title;
        job.description = description;  
        job.requirements = requirements;
        job.salary = salary;
        job.experienceLevel = experienceLevel;
        job.location = location;
        job.jobType = jobType;
        job.position = position;

        await Job.findByIdAndUpdate(job._id, job);
        return res.status(200).json({message: "Job updated successfully", job});

    } catch (error) {
        return res.status(500).json({message: "Internal Server Error", error: error.message});
    }
}

export const deleteJob = async (req, res) => {
    try {
        const user = req.user;
        const jobId = req.params.id;
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({message: "Job not found"});
        }
        if (job.created_by.toString() !== user._id.toString()) {
            return res.status(403).json({message: "You are not authorized to delete this job"});
        }
        await Job.findByIdAndDelete(jobId);
        return res.status(200).json({message: "Job deleted successfully"});
    } catch (error) {
        return res.status(500).json({message: "Internal Server Error", error: error.message});
        
    }
}
