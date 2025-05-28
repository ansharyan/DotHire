import express from "express";
import { getMe, login, logout, signup } from "../controllers/userAuth.js";
import { isAuthenticated, isValidUser } from "../middleware.js";
import { userUpdate } from "../controllers/user.js";

const router = express.Router();

router.post("/signup", isValidUser, signup)
router.post("/login", login);
router.get("/logout", logout);
router.put("/update", isAuthenticated,userUpdate);
router.get("/me", isAuthenticated, getMe);

export default router;