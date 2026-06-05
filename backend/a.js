const nodemailer = require("nodemailer")
const prompt = require("prompt-sync")()

// Template 0: Follow-up email template
const getFollowUpEmailContent = (company, role) => {
    return `
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
            border-bottom: 2px solid #0056b3;
            padding-bottom: 10px;
            margin-bottom: 20px;
        }
        .header h2 {
            color: #0056b3;
            margin: 0;
            font-size: 20px;
        }
        .content p {
            margin: 0 0 15px;
        }
        .contact-info {
            background-color: #f9f9f9;
            border-left: 3px solid #0056b3;
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
            
            <p>I am writing to respectfully follow up on the status of my application for the <strong>${role}</strong> role at <strong>${company}</strong>. Having recently completed the Online Assessment (OA), I am keen to learn if there are any updates regarding the evaluation or the subsequent steps in the selection process.</p>
            
            <p>I remain highly enthusiastic about the opportunity to contribute to ${company} and would appreciate any update you might be able to share regarding my candidacy.</p>
            
            <p>Thank you for your time, consideration, and continued guidance throughout this process.</p>
            
            <p>Sincerely,</p>
            <p><strong>Rahul Sharma</strong></p>
        </div>
        
        <div class="contact-info">
            <p><strong>Email:</strong> <a href="mailto:sharmarahul02514@gmail.com" style="color: #5a2d82; text-decoration: none;">sharmarahul02514@gmail.com</a></p>
            <p><strong>Contact Number:</strong> +91 8604400838</p>
        </div>
        
        <div class="footer">
            <p>This is a formal follow-up inquiry regarding recent recruitment assessments conducted for ${company} initiatives.</p>
        </div>
    </div>
</body>
</html>
`;
};

// Template 1: Fresh job application email template
const getApplicationEmailContent = (company, role) => {
    return `
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
            
            margin: 20px auto;
            padding: 20px;
            border: 1px solid #e0e0e0;
            border-radius: 8px;
            background-color: #ffffff;
        }
        .header {
            border-bottom: 2px solid #0056b3;
            padding-bottom: 10px;
            margin-bottom: 20px;
        }
        .header h2 {
            color: #0056b3;
            margin: 0;
            font-size: 20px;
        }
        .content p {
            margin: 0 0 15px;
        }
        .highlight-box {
            background-color: #f9f9f9;
            border-left: 3px solid #0056b3;
            padding: 12px;
            margin: 15px 0;
            font-size: 14px;
        }
        .btn-container {
            margin: 25px 0;
            text-align: left;
        }
        .resume-btn {
            background-color: #0056b3;
            color: #ffffff !important;
            text-decoration: none;
            padding: 12px 20px;
            font-size: 14px;
            font-weight: bold;
            border-radius: 4px;
            display: inline-block;
        }
        .contact-info {
            background-color: #f9f9f9;
            border-left: 3px solid #0056b3;
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
            <h2>Application for ${role}</h2>
        </div>
        <div class="content">
            <p>Dear Hiring Team,</p>
            
            <p>I hope this email finds you well.</p>
            
            <p>I recently came across the posting for the <strong>${role}</strong> position at <strong>${company}</strong> and am highly interested in the opportunity. Given my practical engineering background and technical skill set, I believe I would be a strong fit for your team.</p>
            
            <p>I am a final-year student at IIIT Kota and am currently working as a Software Development Intern at MSD. I also bring foundational frontend engineering experience from my internship at LineCode. My core technical profile centers on full-stack development, database optimization, and high-performance data systems.</p>
            
            <div class="highlight-box">
                <strong>Technical Profile Summary:</strong>
                <ul style="margin: 5px 0 0 20px; padding: 0;">
                    <li><strong>Internship Experience:</strong> Software Development Intern at MSD & Frontend Intern at LineCode</li>
                    <li><strong>Core Technical Stack:</strong> MERN Stack (MongoDB, Express, React, Node.js), Python, FastAPI, Next.js, and SQL</li>
                    <li><strong>Problem Solving:</strong> 700+ algorithm challenges solved on platforms like LeetCode and Codeforces</li>
                </ul>
            </div>

            <p>My resume is available via the link below for your review. I would appreciate it if you could take a look at my qualifications and guide me on the next steps of your recruitment process.</p>
            
            <div class="btn-container">
                <a href="https://drive.google.com/file/d/1vLG-pZbsWbF0-mUoW7VSRWVTLvlNp1-p/view?usp=drivesdk" target="_blank" class="resume-btn">View My Resume</a>
            </div>
            
            <p>Thank you for your time, consideration, and guidance. I look forward to the possibility of discussing how I can contribute to ${company}.</p>
            
            <p>Sincerely,</p>
            <p><strong>Rahul Sharma</strong></p>
        </div>
        
        <div class="contact-info">
            <p><strong>Email:</strong> <a href="mailto:sharmarahul02514@gmail.com" style="color: #333333; text-decoration: none;">sharmarahul02514@gmail.com</a></p>
            <p><strong>Contact Number:</strong> +91 8604400838</p>
        </div>
        
        <div class="footer">
            <p>This is a formal application inquiry regarding current recruitment opportunities.</p>
        </div>
    </div>
</body>
</html>
    `;
};

const mail = async(to, type, company, role) => {
    const options = {
        0:{
            subject:'Inquiry regarding Online Assessment (OA) Result - Rahul Sharma',
            html:getFollowUpEmailContent(company,role)
        },
        1:{
            subject:`Application for ${role} - Rahul Sharma`,
            html:getApplicationEmailContent(company, role)
        }
    }
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
            subject: options[type].subject,
            html: options[type].html
        }
        await transporter.sendMail(mailOptions);
        
        console.log("Mail sent successfully to:", to);
        return true;
    } catch (err) {
        console.log("Error in sending mail:", err);
        return false;
    }
}

const to = prompt('Enter mail: ')||"2022kuec2064@iiitkota.ac.in";
const type = prompt('Enter type (0 or 1): ')|| '1';
const company = prompt("Enter Company: ")||"XYZ co";
const role = prompt("Enter Role: ")||"ABC role"
mail(to, parseInt(type), company, role)
