const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user.model.js");
const generateAccessToken = require("../utils/generateAccessToken.js");
const generateRefreshToken = require("../utils/generateRefreshToken.js");
const { sendMail } = require("../utils/sendMail.js");
const { data } = require("autoprefixer"); // Not typically needed here
const {uploadOnCloudinary} = require("../utils/cloudinary.utils.js");
const { redirect } = require("react-router-dom");


const registerUser = async(req,res)=>{
    const {name,username,email,password,phone,address}=req.body
    if (!name || !username || !email || !password ){
        return res.status(400).json(
            {
                message:"All fields are required",
                data:{name,username,password,email},
                success:false
            }
        )
    }
    try{
        console.log("entered");
        const existingUser = await User.findOne({
            $or:[{username},{email}]
    })
        if (existingUser){
            return res.status(400).json({
                message:"User already exists",
                success:false
            })
        }
        console.log("user done");
        // Password hashing
        const hashPassword = await bcrypt.hash(password,10);

        //Avatar upload

        console.log("request file:", req.file);
        console.log("Avatar file path:", req.file?.path);
        const avatar = await uploadOnCloudinary(req.file?.path)

        console.log("Avatar done");
        // User creation
        const UserData = await User.create({
            name,username,email,password:hashPassword,phone,address,avatar:avatar.url||null
        })

        // Token generation
        const accessToken = await generateAccessToken(UserData)
        const refreshToken = await generateRefreshToken(UserData);

        const tokens=await User.findByIdAndUpdate(
        UserData._id,
        {
            refreshToken: refreshToken,
            accessToken:accessToken
        },{new:true})
        if (!tokens){
            res.status(400).json({
                message:"Error in generating token",
                success:false
            })
        }
        console.log("Tokens generated");

        const verify_mail = await sendMail(
            UserData.email,
            "verify the mail",
            `click to verify <a href = "http://localhost:5173/verify?code=${UserData._id}">Click to verify</a>`)

        if(!verify_mail){
            console.log("mail sending failure",verify_mail);
            return res.status(400).json({
                message:"fail to send mail",
                success:false
            })
        }
        console.log("Mail sent successfully");
        res.cookie("accessToken",accessToken,{
            httpOnly:true,
            secure:true,

        })
        res.cookie("refreshToken",refreshToken,{
            httpOnly:true,
            secure:true
        })
        console.log("Cookies set successfully");

        return res.status(201).json({
            message:"Registered",
            success:true,
            data:UserData
        })
    
        }
    catch(err){
        console.error(err);
        return res.status(500).json({
            message:"Internal server error User controller",
            success:false
        });
    }
}

const returnAvatar = async(req,res)=>{
    try{
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }
        return res.status(200).json({
            success: true,
            data: {avatar:user.avatar}
        });
    }
    catch (error) {
        console.error("Error fetching avatar:", error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
}

const login = async(req,res)=>{
    const {email,password}=req.body
    if(!email || !password){
        return res.status(400).json({
            message:"Email and password are required",
            success:false
        })
    }
    try{
        const user=await User.findOne({email})
        if(!user){
            return res.status(404).json({
                message:"user not found",
                success:false
            })
        }
        console.log("User found:", user);
        const isValidPassword = await bcrypt.compare(password,user.password)
        if(!isValidPassword){
            return res.status(400).json({
                message:"Invalid credentials",
                success:false
            })
        }
        const accessToken=await generateAccessToken(user)
        const refreshToken=await generateRefreshToken(user)
        const tokens = await User.findByIdAndUpdate(
            user._id,
            {
                refreshToken: refreshToken,
                accessToken: accessToken
            }, { new: true }
        );
        if (!tokens) {
            return res.status(400).json({
                message: "Error in generating token",
                success: false
            });
        }
        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: false,           // set to true in production if using HTTPS
            sameSite: "Lax",
             maxAge: 1000 * 60 * 60 * 24 * 7
            
        });
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: false,           // set to true in production if using HTTPS
            sameSite: "Lax",
             maxAge: 1000 * 60 * 60 * 24 * 7
            
        });

        console.log("Cookies set successfully",req.cookies);
        return res.status(200).json({
            message: "Login successful",
            success: true,
            data: user
        });
    }
    catch(err){
        console.error("Error during login:", err);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
}

const profileDetails = async(req,res)=>{
    try{
        const user = await User.findById(req.user._id).select("-password -refreshToken -accessToken")
        if (!user) {
            return res.status(404).json({
                message: "User profile not found",
                success: false
            });
        }

        return res.status(200).json({
            data:user,
            success:true
        })
    }catch(err){
        return res.status(500).json({
            message: "Internal server error",
            success: false
        })
    }
}

const logout = async (req, res) => {
  try {
    // Clear cookies
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: true,           // important in production (HTTPS)
      sameSite: "None",       // necessary if frontend is on different domain/port
    });
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });

    // Remove tokens from DB
    const user = await User.findByIdAndUpdate(
      req.user._id, 
      {
        refreshToken: "",
        accessToken: "",
      },
      { new: true }
    );

    if (!user) {
      res.redirect("http://localhost:5173/login");
    }

    console.log("User logged out successfully:", user.email);
    return res.status(200).json({
      success: true,
      message: "Logout successful",
    });

  } catch (err) {
    console.error("Error during logout:", err);
    redirect("/login")
    return res.status(500).json({
      success: false,
      message: "Internal server error during logout",
    });
  }
};

module.exports = { 
    profileDetails,
    registerUser,
    returnAvatar,
    login,
    logout
};
