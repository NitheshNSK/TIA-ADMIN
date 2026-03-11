const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../configs/configs");

const checkTokenService = (token) => {
    const decoded = jwt.verify(token, JWT_SECRET);

    return {
        valid: true,
        userId: decoded.id,
        role: decoded.role,
        expiresAt: new Date(decoded.exp * 1000), // convert seconds → ms
    };
};

module.exports = { checkTokenService };
