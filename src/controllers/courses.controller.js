// src/controllers/courses.controller.js

let courses = require('../data/courses.data'); // Import data dummy

// --- Prinsip 6: Validation & Error Handling (untuk POST/PUT) ---
const validateCourse = (data) => {
    // Bidang wajib: code, title, credits 
    if (!data.code) {
        return { status: "fail", message: "Field 'code' wajib diisi" };
    }
    if (!data.title) {
        // Contoh format respon error sesuai ketentuan I. [cite: 68]
        return { status: "fail", message: "Field 'title' wajib diisi" };
    }
    if (!data.credits) {
        return { status: "fail", message: "Field 'credits' wajib diisi" };
    }
    // Pastikan credits adalah angka
    if (isNaN(data.credits)) {
        return { status: "fail", message: "Field 'credits' harus berupa angka" };
    }
    return null; // Tidak ada error
};

// 1. GET /api/courses (Ambil semua data)
exports.getAllCourses = (req, res) => {
    // Prinsip 4: Consistent Status Codes (200 OK) 
    // Prinsip 5: JSON Representation 
    res.status(200).json({ 
        status: "success",
        data: courses 
    });
};

// 2. GET /api/courses/:id (Ambil data berdasarkan id)
exports.getCourseById = (req, res) => {
    const id = parseInt(req.params.id);
    const course = courses.find(c => c.id === id);

    if (course) {
        // Status 200 OK 
        res.status(200).json({ 
            status: "success",
            data: course 
        });
    } else {
        // Status 404 Not Found 
        res.status(404).json({ 
            status: "fail", 
            message: "Course tidak ditemukan" 
        });
    }
};

// 3. POST /api/courses (Tambah data baru)
exports.createCourse = (req, res) => {
    const validationError = validateCourse(req.body);
    if (validationError) {
        // Prinsip 4 & 6: Consistent Status Codes (400 Bad Request) & Error Handling 
        return res.status(400).json(validationError); 
    }

    const newCourse = {
        id: courses.length > 0 ? courses[courses.length - 1].id + 1 : 1,
        code: req.body.code,
        title: req.body.title,
        credits: parseInt(req.body.credits), // Pastikan credits sebagai integer
    };

    courses.push(newCourse);

    // Status 201 Created 
    res.status(201).json({
        status: "success",
        message: "Course berhasil ditambahkan",
        data: newCourse,
    });
};

// 4. PUT /api/courses/:id (Update data)
exports.updateCourse = (req, res) => {
    const id = parseInt(req.params.id);
    const index = courses.findIndex(c => c.id === id);
    
    if (index === -1) {
        // Status 404 Not Found 
        return res.status(404).json({ 
            status: "fail", 
            message: "Course tidak ditemukan" 
        });
    }

    const validationError = validateCourse(req.body);
    if (validationError) {
        // Status 400 Bad Request 
        return res.status(400).json(validationError); 
    }

    // Lakukan update data
    courses[index] = {
        ...courses[index], // Pertahankan id dan properti lama yang tidak di-update
        code: req.body.code,
        title: req.body.title,
        credits: parseInt(req.body.credits),
    };

    // Status 200 OK 
    res.status(200).json({
        status: "success",
        message: "Course berhasil diperbarui",
        data: courses[index],
    });
};

// 5. DELETE /api/courses/:id (Hapus data)
exports.deleteCourse = (req, res) => {
    const id = parseInt(req.params.id);
    const initialLength = courses.length;
    
    // Filter data, yang tidak memiliki id yang dimaksud akan tetap
    courses = courses.filter(c => c.id !== id);

    if (courses.length < initialLength) {
        // Status 204 No Content 
        res.status(204).end(); // Menggunakan .end() untuk 204
    } else {
        // Status 404 Not Found 
        res.status(404).json({ 
            status: "fail", 
            message: "Course tidak ditemukan" 
        });
    }
};

// 6. GET /api/info (Informasi service)
exports.getInfo = (req, res) => {
    // Prinsip 7: Discoverability, melalui endpoint /api/info 
    res.status(200).json({
        "apiName": "Web Service Engineering UTS API",
        "resource": "courses (Mata Kuliah)",
        "version": "1.0",
        "author": "M.KASPUL ANWAR [230104040212]",
        "endpoints": [
            { method: "GET", path: "/api/courses", description: "Ambil semua courses" },
            { method: "GET", path: "/api/courses/:id", description: "Ambil course berdasarkan ID" },
            { method: "POST", path: "/api/courses", description: "Tambah course baru" },
            { method: "PUT", path: "/api/courses/:id", description: "Update course" },
            { method: "DELETE", path: "/api/courses/:id", description: "Hapus course" },
            { method: "GET", path: "/api/info", description: "Informasi service ini" }
        ]
    });
};