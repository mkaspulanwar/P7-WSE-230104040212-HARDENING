# Panduan Kontribusi pada RESTful API Hardening (P7 WSE)

Terima kasih telah mempertimbangkan untuk berkontribusi pada proyek ini. API ini merupakan hasil pengembangan Web Service Engineering (WSE) yang fokus pada 7 Prinsip RESTful dan penguatan keamanan (Hardening & Observability).

## Bagaimana Cara Berkontribusi?

Kontribusi dapat berupa:
1.  **Pelaporan *Bug***: Jika menemukan *error* atau *bug* pada endpoint yang sudah ada.
2.  **Peningkatan Fitur**: Menambahkan *middleware* keamanan/logging yang lebih lanjut (misalnya, Winston, JWT Auth).
3.  **Perbaikan Dokumentasi**: Memperbaiki kesalahan ketik atau memperjelas bagian `README.md`.

## Lingkungan Pengembangan (Development Setup)

Untuk memulai kontribusi, pastikan Anda mengikuti langkah-langkah *setup* yang ada di `README.md`:

1.  **Kloning Repositori**: `git clone <URL_REPO>`
2.  **Instalasi Dependensi**: `npm install` (Termasuk `helmet`, `cors`, `morgan`, `dotenv`, dll.).
3.  **Konfigurasi**: Buat file `.env` untuk mengatur `PORT`, `RATE_LIMIT_MAX`, dll.

## Standar Kode dan Kualitas

Semua kontribusi **Wajib** mematuhi standar berikut:

### 1. Struktur Modular

* Semua logika bisnis harus berada di **`controllers/`**.
* Definisi rute harus berada di **`routes/`**.
* Semua *middleware* baru (seperti otorisasi atau *logging* tambahan) harus diletakkan di folder **`middlewares/`**. 

### 2. Kepatuhan RESTful

* Gunakan **HTTP Methods** yang tepat (GET, POST, PUT, DELETE).
* Gunakan **Status Codes** yang Konsisten (200, 201, 204, 400, 404, 500).
* Pastikan *response* selalu dalam format **JSON** yang rapi (`{ "status": "success", "data": ... }` atau `{ "status": "fail", "message": ... }`).

### 3. Error Handling

* **Validasi Input**: Setiap *controller* yang menerima `POST` atau `PUT` harus menerapkan validasi dan mengembalikan **Status 400 (Bad Request)** jika input tidak valid.
* **Global Error**: Pastikan *error* tak terduga (misalnya ReferenceError) ditangkap oleh **`errorHandler.js`** dan dikembalikan sebagai **Status 500**.

## Alur Kontribusi (Git Workflow)

1.  **Fork** repositori ini ke akun GitHub Anda.
2.  Buat *branch* baru dari `main` (misalnya `git checkout -b feature/nama-fitur-baru`).
3.  Lakukan perubahan dan *commit* dengan pesan yang deskriptif.
4.  Pastikan semua *endpoint* yang sudah ada (**CRUD, /api/health, /api/info**) masih berfungsi normal.
5.  **Push** *branch* Anda.
6.  Buka **Pull Request (PR)** ke *branch* `main` dari repositori asli.

Kami akan meninjau Pull Request Anda secepatnya. Terima kasih!
