require('dotenv').config();

module.exports = {
    JWT_SECRET: process.env.JWTSECREATKEY,
    DBCONNECTION_STRING: process.env.CONNECTION_STRING,
    JWTSECREATKEY: process.env.JWTSECREATKEY,
    JWTSECREATEDURATION: process.env.JWTSECREATEDURATION || "1h"
}