import User from "./models/user.js";
import jwt from "jsonwebtoken";


export const isValidUser = async (req,res,next) =>{
    try {
        const {fullName, password, email} = req.body;

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)){
            return res.status(400).json({error: "Invalid Email Format"});
        }

        const existingEmail = await User.findOne({ email });
        if(existingEmail){
            return res.status(400).json({error: "User with same email exists!"});
        }

        //hashPassword
        if(password.length <6 ){
            return res.status(400).json({error: "Password length should be greater than 6"});
        }

        next();
    } catch (err) {
        console.log(err)
        return err;
    }
}

export const isAuthenticated = async (req,res,next) => {
    try {
        const token = req.cookies.jwt;
        if(!token){
            return res.status(401).json({error: "Not Logged In"});
        }
        const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
        if(!verifyToken){
            return res.status(401).json({error: "Unauthorized token not verified"});
        }

        const user = await User.findById(verifyToken.userId);
        if(!user){
            return res.status(401).json({error: "User Not Found at route protection"});
        }
        req.user = user;
        next();
    } catch (err) {
        console.log(err)
        return err;
    }
}

export const isJobAuthenticated = async (req,res,next) => {
    try {
        req.user.role === "employer" ? next() : res.status(401).json({error: "Unauthorized You are not an employer"});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

export const isJobValid = async (req,res,next) => {
    try {
        const {title, description, salary, experienceLevel, location, jobType, position, company} = req.body;
        if(!title || !description || !salary || !experienceLevel || !location || !jobType || !position || !company){
            return res.status(400).json({error: "Please fill all the fields"});
        }
        
        next();
    } catch (error) {
        
    }
}