import User from "../models/user.js";
import { v2 as cloudinary } from "cloudinary";

export const userUpdate = async (req, res) => {
    try {
        const form = req.body;
        const userId = req.user._id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        if(form.profile?.profilePhoto){
            if(user.profile.profilePhoto){
                await cloudinary.uploader.destroy(user.profile.profilePhoto.split("/").pop().split(".")[0])
            }
            const url = await cloudinary.uploader.upload(form.profile.profilePhoto)
            form.profilePhoto = url.secure_url;
        }

        user.fullname = form.fullname || user.fullname;
        user.phoneNumber = form.phoneNumber || user.phoneNumber;
        user.profile.bio = form.profile?.bio || user.profile.bio;
        user.profile.resume = form.profile?.resume || user.profile.resume;
        user.profile.profilePhoto = form.profile?.profilePhoto || user.profile.profilePhoto;
        user.company = form.company || user.company;
        await user.save();
        user.password = null;
        return res.status(200).json({ message: "User updated successfully", user });

        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal Server Error" });
        
    }
}