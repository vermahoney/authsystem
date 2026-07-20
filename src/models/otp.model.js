import mongoose from "mongoose";

const otpSchema= new mongoose.Schema({
    email:{
        type:String,
        required:[true, "email is required "]
    },

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:[true,"user is required"]
    },
    otphash:{
        type:String,
        Required:[true,"otp hash is required"]
    },

    expiresAt:{
        type:Date,
        Required:[true, "expiration time is required"]
    }
})