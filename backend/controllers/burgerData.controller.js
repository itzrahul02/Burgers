const BurgerData = require("../models/burgerData.model");
const { uploadOnCloudinary } = require("../utils/cloudinary.utils");

const postBurgerData = async (req, res) => {
  const { name, price, description, category } = req.body;
  // const admin_id = req.user.id; // Uncomment if using auth middleware
  const admin_id=req.user._id
  if (!name || !price || !description || !category) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const imageUrl = await uploadOnCloudinary(req.file?.path);

    const burgerData = new BurgerData({
      admin_id,
      name,
      price,
      description,
      image: imageUrl.secure_url,
      category
    });

    const data = await burgerData.save();

    if (!data) {
      return res.status(400).json({ message: "Failed to add burger data" });
    }

    return res.status(201).json({
      message: "Burger data added successfully",
      data
    });
  } catch (err) {
    console.error("Error adding burger data:", err);
    return res.status(500).json({
      message: "Internal server error",
      success: false
    });
  }
};

const getBurgerData = async(req,res)=>{
  try{
    const data = await BurgerData.find()
   if(!data){
    return res.status(400).json({
      message:"Burger Data Absent"
      ,success:false
    })
   }
   return res.status(200).json({
    data:data,
    success:true
   })
  }catch(err){
    return res.status(500).json({
      message:"Internal server error in burgerDatacontroller.js",
      success:false
    })
  }
}
module.exports = { postBurgerData,getBurgerData };