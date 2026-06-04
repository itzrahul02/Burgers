const nodemailer = require("nodemailer")

const mail = async(to)=>{
    const content = `
<!DOCTYPE html>
<html>
<head>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333333;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            padding: 20px;
            border: 1px solid #e0e0e0;
            border-radius: 8px;
            background-color: #ffffff;
        }
        .header {
            border-bottom: 2px solid #5a2d82;
            padding-bottom: 10px;
            margin-bottom: 20px;
        }
        .header h2 {
            color: #5a2d82;
            margin: 0;
            font-size: 20px;
        }
        .content p {
            margin: 0 0 15px;
        }
        .contact-info {
            background-color: #f9f9f9;
            border-left: 3px solid #5a2d82;
            padding: 12px;
            margin: 20px 0;
        }
        .contact-info p {
            margin: 5px 0;
            font-size: 14px;
        }
        .footer {
            margin-top: 25px;
            font-size: 12px;
            color: #777777;
            border-top: 1px solid #e0e0e0;
            padding-top: 15px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>Application Status Inquiry</h2>
        </div>
        <div class="content">
            <p>Dear Hiring Team,</p>
            
            <p>I hope this email finds you well.</p>
            
            <p>I am writing to respectfully follow up on the status of my application for the software role at NatWest Group. Having recently completed the Online Assessment (OA), I am keen to learn if there are any updates regarding the evaluation or the subsequent steps in the selection process.</p>
            
            <p>I remain highly enthusiastic about the opportunity to contribute to NatWest Group and would appreciate any update you might be able to share regarding my candidacy.</p>
            
            <p>Thank you for your time, consideration, and continued guidance throughout this process.</p>
            
            <p>Sincerely,</p>
            <p><strong>Rahul Sharma</strong></p>
        </div>
        
        <div class="contact-info">
            <p><strong>Email:</strong> <a href="mailto:sharmarahul02514@gmail.com" style="color: #5a2d82; text-decoration: none;">sharmarahul02514@gmail.com</a></p>
            <p><strong>Contact Number:</strong> +91 8604400838</p>
        </div>
        
        <div class="footer">
            <p>This is a formal follow-up inquiry regarding recent recruitment assessments conducted for NatWest Group initiatives.</p>
        </div>
    </div>
</body>
</html>
    `;
    try{
        const transporter = nodemailer.createTransport({
            service:"gmail",
            auth:{
                user:"sharmarahul02514@gmail.com",
                pass:"zlin ayxn pbte ltfg"
            }
        })
        const mailOptions = {
            from: "sharmarahul02514@gmail.com",
            to: to,
            subject: 'Inquiry regarding Online Assessment (OA) Result - Rahul Sharma',
            html: content
        }
        await transporter.sendMail(mailOptions);
        
        console.log("Mail sent successfully to:", to);
        return true;
    } catch (err) {
        console.log("Error in sending mail:", err);
        return false;
    }
}

const mail_list = [
    "margaret.priyadarshini@rbs.co.uk",
"manisha.sinha@natwest.com", "manisha.sinha@rbs.co.uk",
"neha.rohilla@natwest.com",
"ekta.k.bathla@natwest.com",
"pilot20in@yahoo.com", "parvez.khan@rbs.com",
"shaina.bansal@rbs.co.uk"

]
for(let i of mail_list){
    mail(i)
}
