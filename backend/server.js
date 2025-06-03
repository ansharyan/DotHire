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
import  path  from "path";

const app = express();
dotenv.config();
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


app.use(cors());
app.use(express.json());
app.use(express.json({limit: "5mb"}));
app.use(express.urlencoded({ extended: true, limit: "5mb" }));
app.use(cookieParser());

const __dirname = path.resolve();
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


if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "/frontend/dist")));

    app.get("/{*any}", (req,res) =>{
        res.sendFile(path.join(__dirname,"frontend", "dist", "index.html"));
    })
}

// app.get("/", (req, res) =>{
//     res.json("Welcome to Job Sphere");
    
// })

app.listen(PORT, () => {
    connectdb();
    console.log(`Server is running on port ${PORT}`);
});