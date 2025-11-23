# RESTful API Hardening & Observability (Praktikum 7)

## Project Overview
Proyek ini merupakan kelanjutan dari hasil UTS (Web Service Engineering) dengan penambahan fitur Keamanan (Hardening) dan Observabilitas (Observability) sesuai dengan Modul Praktikum 7. API ini dibangun menggunakan Node.js dan Express.js dengan resource utama `courses`.

## Tim Developer

| Peran | Nama | NIM | Profil GitHub |
| :--- | :--- | :--- | :--- |
| **Pengembang Proyek** | M. Kaspul Anwar | 230104040212 | [![](https://img.shields.io/badge/GitHub-M.KaspulAnwar-181717?style=flat&logo=github)](https://github.com/mkaspulanwar) |
| **Dosen Pengampu** | Muhayat, M. IT | - | [![](https://img.shields.io/badge/GitHub-Muhayat,M.IT-181717?style=flat&logo=github)](https://github.com/muhayat-lab) |

---

## ✨ Fitur Implementasi Praktikum 7

API ini telah diperkuat dengan implementasi fitur berikut:

1.  **Security Headers (Helmet):** Menggunakan `helmet` untuk menambahkan lapisan keamanan melalui HTTP headers.
2.  **CORS:** Menggunakan `cors` untuk membatasi akses ke API hanya dari *origin* yang diizinkan.
3.  **Rate Limiter:** Menggunakan `express-rate-limit` untuk membatasi *request* per periode waktu (mencegah DDoS sederhana).
4.  **Morgan Logging:** Menggunakan `morgan` untuk logging request secara sistematis ke *file* **`logs/access.log`**.
5.  **Global Error Handler (500):** Middleware terakhir yang memastikan semua *error* tak terduga menghasilkan **Status 500** dengan *response* JSON yang konsisten.
6.  **Handler 404 Global:** Middleware yang menangani semua *endpoint* yang tidak terdefinisi dengan **Status 404** JSON.
7.  **Monitoring Endpoint:** Menambahkan **`/api/health`** untuk pengecekan status *uptime* service.

---

## ⚙️ Panduan Instalasi & Menjalankan Proyek

### 1. Kloning Repositori & Instalasi Dependensi

⚠️ **CATATAN PENTING (Node Modules):**
Repository ini menggunakan `.gitignore` untuk mengabaikan folder **`node_modules`**. Anda harus menginstal semua dependensi yang diperlukan sendiri.

```bash
# Kloning repositori
git clone <URL_REPO_ANDA>
cd P7-WSE-230104040212-HARDENING

# Instal semua dependensi (npm install)
npm install
```
### 2. Konfigurasi Environment (.env)
Buat file baru bernama .env di root folder proyek Anda dan sesuaikan konfigurasinya:

```bash
PORT=3000
RATE_LIMIT_MAX=100
RATE_LIMIT_WINDOW_MS=900000  # Waktu dalam milidetik (contoh: 15 menit)
NODE_ENV=development
```

### 3. Menjalankan Server
Jalankan server menggunakan script yang telah dikonfigurasi (asumsi menggunakan nodemon):

```bash
npm run dev

# Server akan berjalan pada http://localhost:3000
```

### Langkah-langkah Menjalankan Proyek

1.  **Clone Repository:**
    ```bash
    git clone [LINK REPO GITHUB ANDA]
    cd [NAMA FOLDER PROJECT ANDA]
    ```

2.  **Instal Dependensi:**
    Instal Express.js dan Nodemon (untuk mode development).
    ```bash
    npm install
    ```

3.  **Jalankan Server:**
    Server akan berjalan di **Port 3000**[cite: 55].

    ```bash
    npm run dev 
    ```
    *(Kode wajib dijalankan dengan perintah ini [cite: 57])*

---

## 📚 Resource Utama: `courses`

Resource yang diimplementasikan didasarkan pada digit akhir NIM (230104040212), yaitu **`courses`** (Data Mata Kuliah).

| Digit Akhir NIM | Resource | Deskripsi | Field Utama (wajib ada) |
| :---: | :--- | :--- | :--- |
| 0 | books | Data buku | title, author, year |
| 1 | articles | Data artikel | title, author, content |
| 2 | courses | Data mata kuliah | code, title, credits |
| 3 | students | Data mahasiswa | name, npm, major |
| 4 | employees | Data pegawai | name, position, salary |
| 5 | members | Data anggota organisasi | name, role, joinedAt |
| 6 | events | Data kegiatan kampus | title, date, location |
| 7 | movies | Data film | title, genre, year |
| 8 | orders | Data pesanan | product, quantity, price |
| 9 | tasks | Data tugas | title, deadline, status |

---

### Field Utama (Wajib Ada)

Setiap objek *course* memiliki *field* berikut:

| Field | Tipe Data | Keterangan |
| :--- | :--- | :--- |
| `id` | Integer | ID unik (otomatis dibuat) |
| `code` | String | Kode mata kuliah (Wajib) |
| `title` | String | Nama mata kuliah (Wajib) |
| `credits` | Integer | Jumlah SKS (Wajib) |

---

### Contoh Format Data
```json
[
  { "id": 1, "code": "TI001", "title": "Web Service Engineering", "credits": 3 },
  { "id": 2, "code": "TI002", "title": "Sistem Basis Data", "credits": 4 }
]
```
### Struktur Folder Proyek
Struktur folder yang digunakan mengikuti template standar yang disyaratkan:
```markdown
src/
├── app.js             # File utama Express.js
├── routes/
│   └── courses.routes.js # Routing untuk resource courses
├── controllers/
│   └── courses.controller.js # Logika CRUD dan Validasi
└── data/
    └── courses.data.js   # Data dummy (array courses)
README.md
```

---

### Spesifikasi Endpoint RESTful

Semua endpoint menggunakan prefix `/api`.

| Method | Endpoint | Deskripsi | Status Code (Sukses/Gagal) |
| :--- | :--- | :--- | :--- |
| **GET** | `/api/courses` | Ambil semua data courses. | 200 |
| **GET** | `/api/courses/:id` | Ambil data course berdasarkan id. | 200 / 404 |
| **POST** | `/api/courses` | Tambah data course baru. | 201 / 400 |
| **PUT** | `/api/courses/:id` | Update data course. | 200 / 400 / 404 |
| **DELETE** | `/api/courses/:id` | Hapus data course. | 204 / 404 |
| **GET** | `/api/info` | Informasi service (Discoverability). | 200 |

---

### Contoh Validasi dan Error Handling (Status 400)

Jika *field* wajib (**code**, **title**, atau **credits**) kosong saat mengirim data, API akan merespon dengan **Status Code 400 Bad Request** dan format *response* error sebagai berikut:

```json
{
  "status": "fail",
  "message": "Field 'title' wajib diisi"
}
```
---

### Penerapan 7 Prinsip RESTful API

Berikut adalah daftar 7 Prinsip RESTful yang diterapkan dalam proyek ini:

| No | Prinsip | Implementasi |
| :---: | :--- | :--- |
| **1** | **Resource-Oriented URI** | Menggunakan kata benda jamak `/api/courses`. |
| **2** | **Proper HTTP Methods** | Menggunakan GET, POST, PUT, DELETE sesuai fungsi CRUD. |
| **3** | **Stateless Communication** | Tidak menyimpan *session* atau *state* klien di server. |
| **4** | **Consistent Status Codes** | Menggunakan 200, 201, 204, 400, 404 tepat sesuai konteks. |
| **5** | **JSON Representation** | Semua *response* dan *request body* menggunakan format JSON yang rapi dan seragam. |
| **6** | **Validation & Error Handling** | Melakukan validasi *field* wajib dan mengirimkan *error* 400 Bad Request jika gagal. |
| **7** | **Discoverability** | Menyediakan *endpoint* `/api/info` sebagai *metadata service*. |


---
