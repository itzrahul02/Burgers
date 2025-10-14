const jwt = require("jsonwebtoken");

const generateAccessToken = async (user) => {
  try {
    const token = await jwt.sign(
      {
        _id: user._id,
        username: user.username,
        email: user.email,
      },
      process.env.SECRET_KEY_ACCESS_TOKEN,
      { expiresIn: "1d" }
    );
    console.log("Access Token Generated: ", token);
    return token;
  } catch (err) {
    console.log("Error in generating access token:", err);
    throw new Error("Access token generation failed");
  }
};

module.exports = generateAccessToken;