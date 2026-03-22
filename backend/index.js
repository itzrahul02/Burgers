const express = require("express");
const dotenv = require("dotenv");
const router = require("./routes/paymentRoute.js");
const userRouter = require("./routes/user.router");
const cors = require("cors")
const {connectDB} = require("./config/databse");
const cookieParser = require("cookie-parser");
const burgerRouter = require("./routes/burgerData.router");
// Load environment variables before using them
dotenv.config();
connectDB();
const app = express();

// Middleware to parse JSON request bodies
app.use(cors(
    {
        origin: "http://localhost:5173",
        // origin: "https://burgers-jlne.vercel.app", // Adjust this to your frontend URL
        credentials: true, // Allow cookies to be sent with requests
    }
));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser())
app.get("/api/getkey",(req,res)=>{
    try{
        res.status(200).json({key:process.env.RAZORPAY_API_KEY})
    }
    catch(error){
        console.log("Key Error",error);
    }
})

app.use("/api", router);
app.use("/api/user",userRouter)
app.use("/api/burgers",burgerRouter)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is working on port ${PORT}`);
});
