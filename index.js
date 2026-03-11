require("dotenv").config();

const mongoose = require("mongoose");
const http = require("http");
const { Server } = require("socket.io");
const { app } = require("./app");

const PORT = process.env.PORT || 8081;

async function startServer() {
    try {
        // 1️⃣ Connect DB first
        await mongoose.connect(process.env.CONNECTION_STRING, {
            autoIndex: false,
        });

        console.log("✅ Database connected successfully");

        // 2️⃣ Create HTTP server from Express
        const server = http.createServer(app);

        // 3️⃣ Initialize Socket.IO
        const io = new Server(server, {
            cors: {
                origin: [
                    "http://localhost:5173",
                    "https://operation-tia-edu.vercel.app",
                ],
                credentials: true,
            },
        });

        // 4️⃣ Make io globally accessible
        app.set("io", io);

        // 5️⃣ Socket connection listener
        io.on("connection", (socket) => {
            console.log("🔌 Client connected:", socket.id);

            socket.on("disconnect", () => {
                console.log("❌ Client disconnected:", socket.id);
            });
        });

        // 6️⃣ Start server (ONLY here)
        server.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
        });

        // 7️⃣ Graceful shutdown
        process.on("SIGINT", shutdown);
        process.on("SIGTERM", shutdown);

        async function shutdown() {
            console.log("🛑 Shutting down server...");

            try {
                await mongoose.connection.close();
                server.close(() => {
                    console.log("❌ MongoDB disconnected");
                    process.exit(0);
                });
            } catch (err) {
                console.error("Shutdown error:", err);
                process.exit(1);
            }
        }
    } catch (error) {
        console.error("❌ Failed to start server", error);
        process.exit(1);
    }
}

startServer();
