const { checkTokenService } = require("../services/auth.service");

const checkToken = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ valid: false, message: "Token missing" });
        }

        const token = authHeader.split(" ")[1];

        const result = checkTokenService(token);

        res.json(result);
    } catch (err) {
        res.status(401).json({
            valid: false,
            message: "Invalid or expired token",
        });
    }
};

module.exports = { checkToken };
