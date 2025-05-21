const { models } = require("mongoose");
const { instance } = require("../razorpay.js"); // Fix import
const crypto = require("crypto")
const {Payment} = require("../models/paymentModel.js")
const checkout = async (req, res) => {
    try {
        const options = {
            amount: Number(req.body.amount*100), // Amount in paise (500 INR)
            currency: "INR"
        };

        const order = await instance.orders.create(options); // Create order
        console.log("le order arrived");
        console.log(order);
        console.log(req.body);

        res.status(200).json({
            success: true,
            order
        });

    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

const paymentVerification= async (req,res)=>{
    console.log(req.body);
    console.log(req.body.razorpay_order_id,req.body.razorpay_payment_id,req.body.razorpay_signature);

    let body = req.body.razorpay_order_id + "|" + req.body.razorpay_payment_id;
    
    var expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_API_SECRET)
        .update(body.toString())
        .digest('hex');
    
    console.log("sig received", req.body.razorpay_signature);
    console.log("sig generated", expectedSignature);
    const razorpay_order_id= req.body.razorpay_order_id
    const razorpay_payment_id = req.body.razorpay_payment_id
    const razorpay_signature = req.body.razorpay_signature
    if (expectedSignature === req.body.razorpay_signature) {

        await Payment.create({
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature
        })

        res.redirect(`http://localhost:5173/paymentsuccess?reference=${req.body.razorpay_payment_id}`);
    } else {
        res.status(400).json({ success: false, message: "Invalid signature" });
    } 
}
module.exports = { checkout,paymentVerification };