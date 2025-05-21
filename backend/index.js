const express = require("express");
const dotenv = require("dotenv");
const router = require("./routes/paymentRoute");
const cors = require("cors")
const {connectDB} = require("./config/databse")

connectDB();
// Load environment variables before using them
dotenv.config();

const app = express();

// Middleware to parse JSON request bodies
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.get("/api/getkey",(req,res)=>{
    try{
        res.status(200).json({key:process.env.RAZORPAY_API_KEY})
    }
    catch(error){
        console.log("Key Error",error);
    }
})

app.use("/api", router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is working on port ${PORT}`);
});
