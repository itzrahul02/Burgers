const jwt = require("jsonwebtoken");
const User = require("../models/user.model.js");
const generateAccessToken = require("../utils/generateAccessToken.js");

const verifyJWT = async (req, res, next) => {
    try {
        const accessToken = req.cookies.accessToken;
        const refreshToken = req.cookies.refreshToken;

        // No access token
        if (!accessToken) {
            if (!refreshToken) {
                return res.status(401).json({
                    message: "No access and refresh token found",
                    success: false,
                    redirectUrl: "http://localhost:5173/login"
                });
            }

            // Refresh token exists, try to issue a new access token
            const decodedRefreshToken = jwt.verify(
                refreshToken,
                process.env.SECRET_KEY_REFRESH_TOKEN
            );
            console.log("Decoded Refresh Token:", decodedRefreshToken);

            const user = await User.findById(decodedRefreshToken._id);
            if (!user) {
                return res.status(401).json({
                    message: "Invalid refresh token",
                    success: false
                });
            }

            const newAccessToken = generateAccessToken(user);
            res.cookie("accessToken", newAccessToken, {
                httpOnly: true,
                secure: false,
                sameSite: "Lax",
                maxAge: 1000 * 60 * 15 // 15 mins
            });

            req.user = user;
            return next();
        }

        // Access token exists, verify it
        const decodedAccessToken = jwt.verify(
            accessToken,
            process.env.SECRET_KEY_ACCESS_TOKEN
        );

        const user = await User.findById(decodedAccessToken._id);
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }

        req.user = user;
        next();
    } catch (err) {
        console.error("JWT verification error:", err);

        if (err.name === "TokenExpiredError" && req.path === "/api/user/logout") {
            return next();
        }

        return res.status(401).json({
            message: "Invalid or expired token",
            success: false
        });
    }
};

module.exports = verifyJWT;
