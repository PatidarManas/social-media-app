import mongoose from "mongoose";
import postmodel from "../Models/postmodel.js";

export const createpost = async (req,res)=>{
   
    const newpost = new postmodel(req.body) 

    try {
        await newpost.save();
        res.status(200).json(newpost);
    } catch (error) {
        res.status(400).json(error);
        
    }
}

export const getpost = async(req,res)=>{
    const postid = req.params.id;

    
    try {
        const post = await postmodel.findById(postid);
        res.status(200).json(post)
    } catch (error) {
        res.status(400).json(error)
        
    }
}

export const updatepost = async(req,res)=>{
    const postid = req.params.id;

    const{userid,isAdmin} = req.body;

    const post = await postmodel.findById(postid);

    if(post){
        try {
            if(post.userid === userid || isAdmin){
                const updatedpost = await postmodel.findByIdAndUpdate(postid,req.body,{new:true});
                res.status(200).json(updatedpost)
            }
            else{
                res.status(300).json("action forbidden")

            }
        } catch (error) {
            res.status(400).json(error)
            
        }
    }
    else{
        res.status(500).json("post dont exist")
    }
}


export const deletepost = async(req,res)=>{
    const postid= req.params.id;
    const {userid,isAdmin}= req.body;

    const post=await postmodel.findById(postid);
    try {
        if(post.userid === userid || isAdmin){
            await postmodel.findByIdAndDelete(postid);
            res.status(200).json("deleted")
        }else{

            res.status(300).json("action forbidden")
        }
    } catch (error) {
        
        res.status(400).json(error)
    }
}

export const likepost = async (req,res) => {
    const id = req.params.id;
    const {userid} = req.body;

    const post = await postmodel.findById(id);
    if(post){
    try {
            if(!post.likes.includes(userid)){
                await post.updateOne({$push:{likes:userid}})
                res.status(200).json("liked")
            }
            else{
                await post.updateOne({$pull:{likes:userid}})
                res.status(200).json("Disliked")
                
            }
            
        } catch (error) {
        res.status(400).json(error)
        
    }
}
else{
    res.status(500).json("post dont exist");

}
}