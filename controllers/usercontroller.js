import mongoose from "mongoose";
import postmodel from "../Models/postmodel.js";
import usermodel from "../Models/usermodel.js";

export const getuser = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await usermodel.findById(id);
    if (user) {
      const { password, ...details } = user._doc;
      res.status(200).json(details);
    } else {
      res.status(500).json("not found user");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateuser = async (req, res) => {
  const id = req.params.id;

  const { currentuserid, currentisAdmin } = req.body;

  if (currentuserid === id || currentisAdmin === true) {
    try {
      const user = await usermodel.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.status(200).json(user);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  } else {
    res.status(500).json("access denied");
  }
};

export const deleteuser = async (req, res) => {
  const id = req.params.id;
  const { userid, isAdmin } = req.body;
  // const userid= req.params.userid;
  // const isAdmin=req.params.isAdmin;
  try {
    if (userid === id || isAdmin) {
      await usermodel.findOneAndDelete(id);
      res.status(200).json("deleted ");
    } else {
      res.status(403).json("request forbiden");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const followuser = async (req, res) => {
  const id = req.params.id;
  const {currentuserid}  = req.body;
    if(id === currentuserid){
        res.status(403).json("action forbidden")
    }else{
      try {
        const user = await usermodel.findById(id);
      const followinguser =await usermodel.findById(currentuserid);
      if (!user.followers.includes(currentuserid)) {
        await user.updateOne({ $push: { followers: currentuserid } });
        await followinguser.updateOne({ $push: { following: id } });
        res.status(200).json("followed");
      } else {
        res.status(500).json("already followed");
      }
    } catch (error) {
      res.status(400).json(error);
    }
  } 
//   else {
//     res.status(300).json("request forbiden");
//   }
};


export const unfollowuser = async (req, res) => {
  const id = req.params.id;
  const {currentuserid}  = req.body;
    if(id === currentuserid){
        res.status(403).json("action forbidden")
    }else{
      try {
        const user = await usermodel.findById(id);
      const followinguser =await usermodel.findById(currentuserid);
      if (user.followers.includes(currentuserid)) {
        await user.updateOne({ $pull: { followers: currentuserid } });
        await followinguser.updateOne({ $pull: { following: id } });
        res.status(200).json("unfollowed");
      } else {
        res.status(500).json("already unfollowed");
      }
    } catch (error) {
      res.status(400).json(error);
    }
  } 

};

export const gettimelinepost = async(req,res)=>{
  const id = req.params.id;

  try {
    const ownpost = await postmodel.find({userid:id});
    const followinguserpost = await usermodel.aggregate([
      {
        $match:{
          _id: new mongoose.Types.ObjectId(id)
        }
      },
      {
        $lookup:{
          from: "posts",
          localField:"following",
          foreignField:"userid",
          as: "followinguserpost"
        }
      },
      {
        $project:{
          followinguserpost:1,
          _id:0
        }
      }
    ])

    res.status(200).json(ownpost.concat(...followinguserpost[0].followinguserpost))
  } catch (error) {
    res.status(400).json(error)
  }
}
