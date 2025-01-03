import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

// Controller for registering a new user
export const registerUser = async (req, res) => {
    const {name, email, password} = req.body;

    if(!name || !email || !password) {
        return res.staus(400).json({success : false, message : "Please fill all the fields"});
    }
    try {
        
        // check if user already exists
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({success : false, message : "User already exists"});
        }
        // hash password
        const hashedPasswrod = await bcrypt.hash(password, 10);

        // create new user
        const user = await User.create({
            name,
            email,
            password : hashedPasswrod
        });

        // generate token using JWT
        const token = jwt.sign({id : user._id}, process.env.JWT_SECRET, {expiresIn : "1d"});

        // set cookie
        res.cookie("token", token, {
            httpOnly : true,
            secure : process.env.NODE_ENV !== "development",
            sameSite : process.env.NODE_ENV !== "development" ? "none" : "strict",
            maxAge : 24 * 60 * 60 * 1000 // 1 day
        })
        res.status(200).json({success : true, message : "User created successfully", user, token});
        
    } catch (error) {
        res.status(400).json({success : false, message : error.message});
    }
}

// Controller for logging in a user
export const loginUser = async (req, res) => {
    const {email, password} = req.body;

    if(!email || !password) {
        return res.staus(400).json({success : false, message : "Please fill all the fields"});
    }
    try {
        // check if user exists
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({success : false, message : "User does not exist"});
        }

        // check if password is correct
        const passwordMatch = await bcrypt.compare(password, user.password);
        if(!passwordMatch){
            return res.status(400).json({success : false, message : "Invalid credentials"});
        }

        // generate token using JWT
        const token = jwt.sign({id : user._id}, process.env.JWT_SECRET, {expiresIn : "1d"});

        // set cookie
        res.cookie("token", token, {
            httpOnly : true,
            secure : process.env.NODE_ENV !== "development",
            sameSite : process.env.NODE_ENV !== "development" ? "none" : "strict",
            maxAge : 24 * 60 * 60 * 1000 // 1 day
        })
        res.status(200).json({success : true, message : "User logged in successfully", user, token});
    } catch (error) {
        res.status(400).json({success : false, message : error.message});
    }
}

// Controller for logging out a user
export const logoutUser = async (req, res) => {
    res.cookie("token", null, {
        httpOnly : true,
        secure : process.env.NODE_ENV !== "development",
        sameSite : process.env.NODE_ENV !== "development" ? "none" : "strict",
    })
    res.status(200).json({success : true, message : "User logged out successfully"});
}