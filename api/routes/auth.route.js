import express from "express";
import { register, login, logout } from "../controllers/auth.controller.js";

const router = express.Router(); //define routes in the modular isolated manner and can handle middleware and http methods

router.post("/register", register);  //creating new user in database
router.post("/login", login);  //handle user login authenticaation
router.post("/logout", logout); //handles loging out

export default router;
