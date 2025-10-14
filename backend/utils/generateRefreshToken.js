const jwt = require("jsonwebtoken");

const generateRefreshToken = async (user) => {
  try {
    const token = await jwt.sign(
      {
        _id: user._id,
        username: user.username,
        email: user.email,
      },
      process.env.SECRET_KEY_REFRESH_TOKEN, // also fixed typo: REFERSH → REFRESH
      { expiresIn: "7d" }
    );
    console.log("Refresh token generated successfully:", token);

    return token;
  } catch (err) {
    console.log("error in generating refresh token", err);
    throw new Error("Refresh token generation failure");
  }
};

module.exports = generateRefreshToken;