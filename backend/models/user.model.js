const mongoose = require("mongoose"); 

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,   
    },
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
        unique: true,
        minLength: 10,
    },
    address: {
        type: String,
        required: true,
        lowercase: true,
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },
    refreshToken: {               
        type: String,
        default: "",
    },
    accessToken: {                
        type: String,
        default: "",
    },
    avatar: {
        type: String,
        default: "",
    },
    verify_mail: {
        type: Boolean,
        default: false,
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    orderHistory: {
        type: mongoose.Schema.Types.ObjectId,  
        ref: "Order",
    },
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);