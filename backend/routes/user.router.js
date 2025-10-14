const {registerUser,login,returnAvatar,profileDetails,logout} = require("../controllers/user.controller")
const express = require("express");
const upload =require("../middleware/multer.middleware.js");
const userRouter = express.Router()
const auth = require("../middleware/auth.middleware.js")

userRouter.post("/register",
    upload.single("avatar"),
    registerUser)
userRouter.post("/login",login)
userRouter.get("/avatar",auth,returnAvatar)
userRouter.get("/profile",auth,profileDetails)
userRouter.post("/logout",auth,logout)

module.exports = userRouter;