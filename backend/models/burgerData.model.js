const mongoose = require("mongoose");
const burgerDataSchema = new mongoose.Schema({
    admin_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",   
    
    },
    name:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,  
    },
    description:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },

})

const BurgerData = mongoose.model("BurgerData", burgerDataSchema);
module.exports=BurgerData;