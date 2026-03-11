const jwt = require("jsonwebtoken");
const { JWT_SECRET, JWTSECREATEDURATION } = require("../configs/configs");
console.log(JWT_SECRET, JWTSECREATEDURATION)
const signToken = (payload) => {
    return jwt.sign(payload, JWT_SECRET, {
        expiresIn: JWTSECREATEDURATION,
    });
};

module.exports = { signToken };
