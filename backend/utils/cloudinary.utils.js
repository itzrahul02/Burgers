const dotenv = require('dotenv').config();
const cloudinary = require('cloudinary').v2;
const fs = require('fs');

console.log("Cloudinary Configured",
    {
cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
api_key: process.env.CLOUDINARY_API_KEY,
api_secret: process.env.CLOUDINARY_API_SECRET
    }
);

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY, 
    api_secret:process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async(filePath)=>{
    try{
        if (!filePath) {
            console.log("File path is required for upload");
            return res.status(400).json({
                message:"File path is required"
                ,success:false,

            })
        }
        console.log("file path is->",filePath);

        const result = await cloudinary.uploader.upload(filePath,{
            resource_type: "auto",
        })
        if (fs.existsSync(filePath)){
            fs.unlinkSync(filePath);
            console.log("File deleted successfully");
        }
        return result;
    }
    catch(err){
        console.error("Error uploading to Cloudinary:", err);
        if (filePath && fs.existsSync(filePath)){
            fs.unlinkSync(filePath);
            console.log("File deleted after upload error");
        }
        return 
            res.status(500).json({
            message: "Error uploading to Cloudinary",
            success: false,
            error: err.message
        })
        };
    }


module.exports={uploadOnCloudinary}