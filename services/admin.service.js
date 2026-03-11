const bcrypt = require("bcryptjs");
const User = require("../models/user.model");
const { signToken } = require("../auth/token.utils");

const adminLoginService = async ({ email, password }) => {
    const user = await User.findOne({ email });

    if (!user) {
        throw new Error("Invalid credentials");
    }

    if (user.userType !== "admin") {
        throw new Error("Not an admin");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error("Invalid credentials");
    }

    const token = signToken({ id: user._id, role: user.userType });

    return {
        token,
        user: {
            id: user._id,
            name: user.userName,
            email: user.email,
            role: user.userType,
        },
    };
};

module.exports = { adminLoginService };
