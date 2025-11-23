// src/middlewares/errorHandler.js

/**
 * Middleware penanganan error global.
 * Menjamin semua error, termasuk 500, memiliki respons JSON yang konsisten.
 */
module.exports = (err, req, res, next) => {
    // 1. Log error stack ke console server untuk debugging
    console.error(err.stack); 

    // 2. Tentukan status code: gunakan status error yang ada, atau default ke 500
    // Prinsip 4: Consistent Status Codes (500 Internal Server Error)
    const statusCode = err.status || 500; 

    // 3. Kirim response JSON konsisten (Prinsip 5)
    res.status(statusCode).json({
        status: "error", // Status khusus untuk global error handler
        message: err.message || "Internal Server Error"
    });
};