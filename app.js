const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const compression = require("compression");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const passport = require("./auth/passport");
const { router } = require("./routes/index.routes");

const app = express();

app.use(passport.initialize());
/* ---------------- SECURITY ---------------- */
app.set("trust proxy", 1);

app.use(helmet());
app.use(compression());

/* ---------------- CORS ---------------- */
const corsOptions = {
    credentials: true,
    origin: [
        "http://localhost:5173",
        "http://localhost:8080",
        "https://operation-tia-edu.vercel.app",
        "https://operations.tiaedu.in",
    ],
};

app.use(cors(corsOptions));

/* ---------------- RATE LIMIT ---------------- */
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
});

app.use(limiter);

/* ---------------- BODY PARSER ---------------- */
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

/* ---------------- LOGGING ---------------- */
if (process.env.NODE_ENV !== "production") {
    app.use(morgan("dev"));
}

/* ---------------- HEALTH CHECK ---------------- */
app.get("/health", (req, res) => {
    res.status(200).json({ status: "OK", uptime: process.uptime() });
});

/* ---------------- ROUTES ---------------- */
app.use("/api", router);

/* ---------------- ERROR HANDLER ---------------- */
app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || "Internal Server Error",
    });
});

module.exports = { app };
