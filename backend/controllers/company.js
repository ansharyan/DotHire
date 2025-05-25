import Company from "../models/company.js";

export const getAllCompanies = async (req, res) => {
    try {
        const companies = await Company.find();
        if (!companies) {
            return res.status(404).json({ message: "No companies found" });
        }
        res.status(200).json(companies);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
        
    }
}

export const getCompany = async (req, res) => {
    try {
        const {id} = req.params;
        const company = await Company.findById(id);
        if (!company) {
            return res.status(404).json({ message: "Company not found" });
        }
        res.status(200).json(company);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
        
    }
}