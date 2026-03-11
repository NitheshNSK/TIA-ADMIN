const { adminLoginService } = require("../services/admin.service");

const adminLogin = async (req, res, next) => {
    try {
        const result = await adminLoginService(req.body);

        res.json({
            success: true,
            ...result,
        });
    } catch (err) {
        next(err);
    }
};

module.exports = { adminLogin };
