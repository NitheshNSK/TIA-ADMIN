const express = require('express');
const { checkToken } = require('../controllers/auth.controller');

const authRouter = express.Router();


module.exports = authRouter

