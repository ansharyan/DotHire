import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.js";
import jobRouter from "./routes/job.js";
import companyRouter from "./routes/company.js";
import applicationRouter from "./routes/application.js";
import cookieParser from "cookie-parser";
import cloudinary from "cloudinary";

const app = express();
dotenv.config();
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


app.use(cors());
app.use(express.json());
app.use(express.json({limit: "2mb"}));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

const MONGO_URI = process.env.MONGO_URI;

const PORT = process.env.PORT || 8000;

const connectdb = async () =>{
    try {
        await mongoose.connect(MONGO_URI);
        console.log("Database connected")
    } catch (error) {
        console.log(`MONGODB error: ${error}`);
    }
}

app.use("/api/user", userRouter);
app.use("/api/job", jobRouter);
app.use("/api/company", companyRouter);
app.use("/api/application", applicationRouter);

app.get("/", (req, res) =>{
    res.json("Welcome to Job Sphere");
    
})

app.listen(PORT, () => {
    connectdb();
    console.log(`Server is running on port ${PORT}`);
});