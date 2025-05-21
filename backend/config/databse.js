const mongoose = require("mongoose");

const connectDB = async()=>{
    mongoose
    .connect(process.env.MONGO_URI)
    .then((Result)=>{
        console.log("Connected to database");
    })
    .catch((err)=> console.error(err));
}

module.exports = {connectDB};