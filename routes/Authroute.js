import express from "express";
import {  loginuser, registeruser } from "../controllers/Authcontroller.js";
const router=express.Router();


router.post('/newuser', registeruser);

router.post('/login',loginuser);

export default router;
