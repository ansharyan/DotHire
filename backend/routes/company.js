import express from "express";
import { getAllCompanies, getCompany } from "../controllers/company.js";

const router = express.Router();

router.get("/", getAllCompanies);
router.get("/:id", getCompany);

export default router;