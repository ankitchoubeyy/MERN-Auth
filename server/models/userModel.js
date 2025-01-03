import mongoose from "mongoose";
import { Schema } from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    verifyOTP : {
        type: String,
        default : ''
    },
    verifyOTPExpire : {
        type: Number,
        default : 0
    },
    isAccountVerified : {
        type: Boolean,
        default : false
    },
    resetOTP : {
        type: String,
        default : ''
    },
    resetOTPExpire : {
        type: Number,
        default : 0
    }
})

const User = mongoose.model('User', userSchema);
export default User;