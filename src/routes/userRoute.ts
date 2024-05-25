import express from "express";
import { getUsers, createUser, loginUser, logoutUser, updateUser, deleteUser } from "../controllers/userController";


const router = express.Router();

router.get("/api/users", getUsers);
router.post("/api/users", createUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.put("/api/users/:id", updateUser);
router.delete("/api/users/:id", deleteUser);  

export default router