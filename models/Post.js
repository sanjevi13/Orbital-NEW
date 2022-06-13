const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema(
    {
        userID:{ //lmao
            type:String,
            required:true
        },
        desc:{
            type:String,
            max:50
        },
        img:{
            type:String
        },
        likes:{
            type:Array,
            default:[]
        }

    },

)

module.exports = mongoose.model("Post", PostSchema);