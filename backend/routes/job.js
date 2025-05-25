import express from "express";
import { createJob, deleteJob, editJob, getAllJobs } from "../controllers/job.js";
import { isAuthenticated, isJobAuthenticated, isJobValid } from "../middleware.js";

const router = express.Router();

router.get("/" ,getAllJobs);
router.post("/create", isAuthenticated,isJobAuthenticated, isJobValid ,createJob)
router.put("/edit/:id", isAuthenticated,isJobAuthenticated, isJobValid ,editJob)
router.delete("/delete/:id", isAuthenticated,isJobAuthenticated ,deleteJob)

export default router;