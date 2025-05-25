import express from "express";
import { createApplication, getAllApplicants, getAppliedJobs, updateApplication } from "../controllers/application.js";
import { isAuthenticated, isJobAuthenticated } from "../middleware.js";

const router = express.Router();

router.post("/apply", createApplication)
router.get("/getApplicants/:id", isAuthenticated,getAllApplicants) //get all applications //job id
router.get("/getApplied/:id", isAuthenticated,getAppliedJobs) //get application by id //user id
router.put("/update/:id",isAuthenticated ,updateApplication)

export default router;