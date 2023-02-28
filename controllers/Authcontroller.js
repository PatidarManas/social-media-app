import mongoose from "mongoose";
import usermodel from "../Models/usermodel.js";
export const registeruser = async (req,res)=>{
    const{username,firstname,lastname,dob,password}=req.body;

    const newuser = new usermodel({username,firstname,lastname,dob,password});

    try {
        await newuser.save()
        res.status(200).json(newuser);

    } catch (error) {
        res.status(404).json(error);
    }
}
export const loginuser = async(req,res)=>{
    const{username,password} = req.body;

    try {
        const user = await usermodel.findOne({username:username});
        if(user){
            if(password === user.password){
                res.status(200).json("login succesfull")
            }
            else{
                res.status(500).json("wrong password")
            }
        }
        else{
            res.status(300).json("user not found")
        }
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}
