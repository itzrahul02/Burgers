const nodemailer = require("nodemailer");

const sendMail = async (to, subject, htmlContent) => {
  try {
    const transporter = await nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      html:htmlContent,
    };

    await transporter.sendMail(mailOptions);

    console.log("Mail sent successfully to:", to);
    return true;
  } catch (err) {
    console.log("Error in sending mail:", err);
    return false;
  }
};

module.exports = { sendMail };

