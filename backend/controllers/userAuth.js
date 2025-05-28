import { generateTokenAndSetCookie } from "../generateToken.js";
import  User  from "../models/user.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) =>{
    try {
    const { fullname, email, password, phoneNumber, role, company } = req.body;

    //hashpassword
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
        fullname,
        email,
        password: hashPassword,
        role,
        phoneNumber,
        company,
        profile: {
            bio: "",
            resume: "",
            profilePhoto: ""
        }
    })

    if(newUser){
        generateTokenAndSetCookie(newUser._id, res);
        await newUser.save();
        res.status(201).json({ message: "User created successfully", user: newUser });
    }else{
        res.status(400).json({ error: "Invalid User Data" });
    }
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        
        if (!email || !password || !role) {
            return res.status(400).json({ error: "Please fill all fields" });
        }

        const user = await User.findOne({ email, role });
        if(!user){
            
            return res.status(400).json({ error: "Invalid Email or User does not exist with this role" });
        }
        const isPasswordValid = await bcrypt.compare(password, user?.password);

        if(!user || !isPasswordValid) {
            return res.status(400).json({ error: "Invalid email or password" });
        }
        //generate token and set cookie
        generateTokenAndSetCookie(user._id, res);

        return res.status(200).json({ message: "Login successful", user });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error});
    }
}

export const logout = async (req, res) =>{
    try {
       res.cookie("jwt", "", {maxAge: 0}); 
       res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

