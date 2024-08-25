import express from "express";
import { deleteUser, getUser } from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/jwt.js";

const router = express.Router(); //creates a new router object from express

router.delete("/:id", verifyToken, deleteUser); // This parameter allows for specifying the ID of the user to delete
router.get("/:id", getUser); //fetching user information based on the provided :id. 

export default router; 
