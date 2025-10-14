const express = require("express");
const { postBurgerData,getBurgerData } = require("../controllers/burgerData.controller.js");
const upload = require("../middleware/multer.middleware.js");
const auth = require("../middleware/auth.middleware.js");
const burgerRouter = express.Router()


burgerRouter.post("/addburger",auth,upload.single("image"),postBurgerData)
burgerRouter.get("/getBurgerData",getBurgerData)

module.exports= burgerRouter;
