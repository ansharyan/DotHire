import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    website: {
        type: String,
        required: true,
    },
    logo: {
        type: String,
        default: '',
    },
    description: {
        type: String,
        default: '',
    },
    location: {
        type: String,
        default: '',
    },
}, { timestamps: true });

const Company = mongoose.model("Company", companySchema);

export default Company;