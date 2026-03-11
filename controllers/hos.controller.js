const { aggregateHos } = require("../services/hos.service");

const hoStaff = async (req, res, next) => {
    try {
        const result = await aggregateHos(req.query);

        res.status(200).json({
            success: true,
            ...result,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = { hoStaff };
