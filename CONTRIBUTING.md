# Panduan Kontribusi

Terima kasih atas minat Anda untuk berkontribusi pada proyek UTS Web Service Engineering ini. Proyek ini adalah implementasi RESTful API sederhana dengan Node.js dan Express.js.

Meskipun tujuan utamanya adalah untuk memenuhi persyaratan ujian, kami menghargai setiap masukan, saran, atau perbaikan, terutama yang berkaitan dengan penerapan prinsip-prinsip RESTful API dan struktur kode.

## Cara Berkontribusi

### 1. Laporkan Bug atau Saran

Jika Anda menemukan *bug* (kesalahan) atau memiliki saran perbaikan, silakan:

1.  Buka tab **Issues** di repositori ini.
2.  Gunakan template yang sesuai (Bug Report atau Feature Request).
3.  Berikan deskripsi yang jelas dan, jika memungkinkan, langkah-langkah untuk mereproduksi masalah (untuk *bug*).

### 2. Mengusulkan Perubahan (Pull Request)

Jika Anda ingin berkontribusi dalam bentuk kode, ikuti langkah-langkah berikut:

1.  **Fork** repositori ini ke akun GitHub Anda.
2.  **Clone** repositori yang sudah Anda *fork* ke lokal Anda.
    ```bash
    git clone [https://github.com/YourUsername/UTS-WSE-NimAnda.git](https://github.com/YourUsername/UTS-WSE-NimAnda.git)
    cd UTS-WSE-NimAnda
    ```
3.  Buat *branch* baru untuk perubahan Anda.
    ```bash
    git checkout -b fix/nama-fitur-atau-bug
    ```
4.  Lakukan perubahan kode Anda. Pastikan perubahan mengikuti standar *linting* (jika ada) dan mempertahankan struktur modular (**src/controllers**, **src/routes**, dll.).
5.  Uji perubahan Anda di Postman untuk memastikan semua *endpoint* yang relevan (`GET`, `POST`, `PUT`, `DELETE`) dan *status codes* (200, 201, 204, 400, 404) tetap berfungsi dengan benar.
6.  *Commit* perubahan Anda dengan pesan yang deskriptif.
    ```bash
    git commit -m "feat: Menambahkan validasi untuk field credits" 
    # atau
    git commit -m "fix: Memperbaiki status code 400 pada POST"
    ```
7.  *Push* *branch* ke *fork* Anda.
    ```bash
    git push origin fix/nama-fitur-atau-bug
    ```
8.  Buka **Pull Request (PR)** dari *branch* Anda ke *branch* utama (`main` atau `master`) repositori asli.

## ⚙️ Standar Kode

* **Prinsip REST:** Semua perubahan harus konsisten dengan **7 Prinsip RESTful API** yang diterapkan dalam proyek ini.
* **Struktur:** Pertahankan struktur folder standar: `src/app.js`, `src/routes/`, `src/controllers/`, `src/data/`.
* **Response:** Semua *response* harus dalam format JSON dan menggunakan *status code* HTTP yang tepat (Prinsip 4 dan 5).

Terima kasih atas waktu dan upaya Anda!
