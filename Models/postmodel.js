import mongoose from "mongoose";

const postschema = mongoose.Schema(
    {
        userid:{
            type: String,
            required: true
        },
        caption:String,
        likes:[],
        image:{
            type:String,
            required:false
        }

    },
    {
        timestamp:true
    }

    
)

var postmodel = mongoose.model("posts",postschema)

export default postmodel;

