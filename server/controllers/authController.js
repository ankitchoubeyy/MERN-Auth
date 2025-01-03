import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import transporter from "../config/nodemailer.js";

// Controller for registering a new user
export const registerUser = async (req, res) => {
  console.log("Request body:", req.body);
  const { name, email, password } = req.body;
  console.log(name);

  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Please fill all the fields" });
  }
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // Generate token using JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: process.env.NODE_ENV !== "development" ? "none" : "strict",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    // Sending informational email for successful account creation
    const mailOptions = {
      from: process.env.SENDER_EMAIL, // sender address
      to: "imkitchoubey@gmail.com", // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: "<b>Hello Ankit, this is a test email</b>", // html body
    };
    await transporter.sendMail(mailOptions);

    res.status(200).json({
      success: true,
      message: "User created successfully",
      user,
      token,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Controller for logging in a user
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Please fill all the fields" });
  }
  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User does not exist" });
    }

    // Check if password is correct
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    // Generate token using JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: process.env.NODE_ENV !== "development" ? "none" : "strict",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });
    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      user,
      token,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Controller for logging out a user
export const logoutUser = async (req, res) => {
  res.cookie("token", null, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: process.env.NODE_ENV !== "development" ? "none" : "strict",
  });
  res
    .status(200)
    .json({ success: true, message: "User logged out successfully" });
};

// Controller to sent OTP for verifying user
export const sendVerifyOTP = async (req, res) => {
    try {
        const {userId} = req.body;
        const user = await User.findById(userId);

        if(user.isAccountVerified){
            return res.status(400).json({success: false, message: "Account already verified"});
        }

        const otp = String(Math.floor(100000 + Math.random() * 900000));
        user.verifyOTP = otp;
        user.verifyOTPExpire = Date.now() + 24 * 60 * 60 * 1000;
        await user.save();

        const mailOptions = {
            from : process.env.SENDER_EMAIL,
            to : "imkitchoubey@gmail.com",
            subject : "Verify your email",
            text : `Your verification code is ${otp}. Please do not share this code with anyone.`,
            html : `<b>Your verification code is ${otp}. Please do not share this code with anyone.</b>`
        }

        await transporter.sendMail(mailOptions);

        res.status(200).json({success: true, message: "OTP sent successfully"});
    } catch (error) {
        
    }
}

// Controller to verify user
export const verifyEmail = async (req, res) => {
    const {userId, otp} = req.body;
    try {
        const user = await User.findById(userId);

        if(!user){
            return res.status(400).json({success: false, message: "User not found"});
        }

        if(user.isAccountVerified){
            return res.status(400).json({success: false, message: "Account already verified"});
        }

        if(user.verifyOTP !== otp || user.verifyOTPExpire === ''){
            return res.status(400).json({success: false, message: "Invalid OTP"});
        }

        if(user.verifyOTPExpire < Date.now()){
            return res.status(400).json({success: false, message: "OTP expired"});
        }

        user.isAccountVerified = true;
        user.verifyOTP = '';
        user.verifyOTPExpire = 0;

        await user.save();

        res.status(200).json({success: true, message: "Account verified successfully"});
    } catch (error) {
        console.log(error);
        res.status(400).json({success: false, message: error.message});
    }
}

// is Authenticated
export const isAuthenticated = async (req, res) => {
    try {
        res.status(200).json({success: true, message: "User is authenticated"});
    } catch (error) {
        res.status(400).json({success: false, message: error.message});
    }
}

// password reset otp
export const sendPasswordResetOTP = async (req, res) => {
    const {email} = req.body;

    if(!email){
        return res.status(400).json({success: false, message: "Email is required"});
    }

    try {
        const user = await User.findOne({email});

        if(!user){
            return res.status(400).json({success: false, message: "User not found"});
        }

        const otp = String(Math.floor(100000 + Math.random() * 900000));
        user.resetOTP = otp;
        user.resetOTPExpire = Date.now() + 24 * 60 * 60 * 1000;
        await user.save();

        const mailOptions = {
            from : process.env.SENDER_EMAIL,
            to : email,
            subject : "Reset your password",
            text : `Your password reset code is ${otp}. Please do not share this code with anyone.`,
            html : `<b>Your password reset code is ${otp}. Please do not share this code with anyone.</b>`
        }

        await transporter.sendMail(mailOptions);

        res.status(200).json({success: true, message: "OTP sent successfully"});
    } catch (error) {
        res.status(400).json({success: false, message: error.message});
    }
}

// password reset
export const resetPassword = async (req, res) => {
    const {email, otp, newPassword} = req.body;

    if(!email || !otp || !newPassword){
        return res.status(400).json({success: false, message: "All fields are required"});
    }

    try {
        const user = await User.findOne({email});

        if(!user) {
            return res.status(400).json({success: false, message: "User not found"});
        }

        if(user.resetOTP !== otp || user.resetOTPExpire === ''){
            return res.status(400).json({success: false, message: "Invalid OTP"});
        }

        if(user.resetOTPExpire < Date.now()){
            return res.status(400).json({success: false, message: "OTP expired"});
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        user.password = hashedPassword;
        user.resetOTP = '';
        user.resetOTPExpire = 0;

        await user.save();

        res.status(200).json({success: true, message: "Password reset successfully"});
    } catch (error) {
        res.status(400).json({success: false, message: error.message});
    }
}