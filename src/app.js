// src/app.js

// 1. Setup Environment dan Import Modul
require('dotenv').config(); // Load .env file [cite: 52]
const express = require('express');
const helmet = require('helmet'); // Keamanan: Security headers [cite: 54]
const cors = require('cors'); // Keamanan: CORS [cite: 55]
const morgan = require('morgan'); // Logging [cite: 56]
const rateLimit = require('express-rate-limit'); // Keamanan: Rate Limiting [cite: 57]
const fs = require('fs');
const path = require('path');

const coursesRoutes = require('./routes/courses.routes');
const coursesController = require('./controllers/courses.controller');
const errorHandler = require('./middlewares/errorHandler'); // Import Global Error Handler [cite: 81]

const app = express();
const PORT = process.env.PORT || 3000; // Gunakan PORT dari .env [cite: 84]

// --- MIDDLEWARE KEAMANAN ---
// 1. Helmet: Tambahkan security HTTP headers [cite: 62]
app.use(helmet()); 

// 2. CORS: Izinkan akses dari origin tertentu [cite: 63]
const corsOptions = {
    // Menggunakan nilai dari .env.
    origin: process.env.CORS_ORIGIN || '*' 
};
app.use(cors(corsOptions)); 

// 3. Rate Limiter: Batasi request per IP [cite: 66]
const limiter = rateLimit({
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || 900000), // 15 menit
    max: parseInt(process.env.RATE_LIMIT_MAX || 100), // Max 100 request
    message: { status: "fail", message: "Terlalu banyak request, coba lagi nanti."} // [cite: 70]
});
app.use(limiter); 

// --- MIDDLEWARE UTILITY & LOGGING ---
app.use(express.json()); // Body Parser [cite: 60]

// Logging Morgan: Tulis log ke file access.log [cite: 65]
const accessLogStream = fs.createWriteStream(
    path.join(__dirname, '..', 'logs', 'access.log'), // Path: /logs/access.log
    { flags: 'a' } 
);
app.use(morgan('combined', { stream: accessLogStream })); // Logging ke file
app.use(morgan('dev')); // Logging ke console (untuk kemudahan development)

// --- ENDPOINT UTAMA (ROUTES) ---
app.use('/api/courses', coursesRoutes); 
app.get('/api/info', coursesController.getInfo);

// --- ENDPOINT MONITORING ---
// Endpoint /api/health (Service Health & Uptime) [cite: 77]
app.get('/api/health', (req, res) => {
    res.status(200).json({ 
        status: "ok", 
        timestamp: new Date().toISOString(),
        uptime: process.uptime() 
    });
});

// --- GLOBAL 404 HANDLER ---
// Middleware ini menangani route yang tidak terdaftar (endpoint tidak dikenal)
app.use((req, res, next) => {
    // Status Code 404 (Prinsip 4)
    res.status(404).json({ 
        status: "fail",
        message: `Endpoint tidak ditemukan: ${req.method} ${req.originalUrl}`
    });
});

// --- GLOBAL ERROR HANDLER ---
// Diletakkan paling akhir setelah semua route dan middleware [cite: 82]
app.use(errorHandler);

// --- START SERVER ---
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});