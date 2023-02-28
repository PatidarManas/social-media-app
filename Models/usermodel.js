import mongoose from "mongoose";

const userschema = mongoose.Schema(
    {
        username:{
            type: String,
            required : true
        },
        firstname:{
            type: String,
            required : true
        },
        lastname:{
            type: String,
            required : true
        },
        dob:{
            type: String,
            required : false
        },
        password:{
            type: String,
            required : true,
        },
        isAdmin:{
            type: Boolean,
            default: false
        },
        bio:String,
        profile:{
            type: String,
           
        },
        followers: [],
        following: []


    },
    {
        timestamp: true
    }
)
const usermodel = mongoose.model("users",userschema);
export default usermodel;