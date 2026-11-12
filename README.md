# yohanex - Video Streaming Platform

Platform website streaming video modern, cepat, dan responsif bernama **yohanex**, dibangun menggunakan React 18, TypeScript, Tailwind CSS, dan Vite.

## ✨ Fitur Utama

- 🎬 **Custom Cinematic Video Player**:
  - Pemutar video kustom dengan kontrol Play/Pause, Replay 10s & Forward 10s.
  - Interactive scrubbable progress bar dengan buffering indicator dan tooltip waktu.
  - Slider volume dinamis dengan tombol mute/unmute instan.
  - Pengatur kecepatan pemutaran (0.5x, 0.75x, 1x, 1.25x, 1.5x, 2x).
  - Selektor resolusi/kualitas streaming (Auto, 4K, 1080p, 720p).
  - Mode Picture-in-Picture (PiP) bawaan browser.
  - Mode Teater (Cinema Mode) dan Fullscreen.
  - Auto-hide kontrol saat pemutaran berlangsung.
  - Indikator riak visual tengah (center feedback ripple).
  - Dukungan aksesibilitas dan preferensi *reduced-motion*.
- ⌨️ **Pintasan Keyboard (Keyboard Shortcuts)**:
  - `Spasi` atau `k` : Putar / Jeda
  - `f` : Layar Penuh (Fullscreen)
  - `m` : Bisukan / Aktifkan Suara (Mute)
  - `j` : Mundur 10 detik
  - `l` : Maju 10 detik
  - `t` : Beralih Mode Teater
  - `Panah Atas / Bawah` : Atur Volume
- 📱 **yohanex Shorts**: Penampil video vertikal interaktif dengan navigasi swipe/tombol, kontrol suara, dan suka real-time.
- 🔍 **Pencarian Cerdas & Filter Kategori**: Pencarian real-time berdasarkan judul, tag, dan channel, dilengkapi chips kategori scrollable (Semua, Coding & Tech, Film & Animasi, Gaming, Musik, AI & Masa Depan, dll.).
- 🚀 **Unggah Video Mandiri (Upload Modal)**: Kreator dapat mengunggah video kustom secara langsung ke feed dengan simulasi progress bar dan preview.
- 💬 **Interaksi Komunitas**: Like/Dislike interaktif, sistem komentar dengan avatar dan balasan, serta tombol Subscribe dengan status notifikasi.
- 🔗 **Modal Bagikan (Share Modal)**: Salin tautan instan, berbagi ke WhatsApp, Telegram, X (Twitter), dan kode sematan (*embed code*).
- 📚 **Perpustakaan & Koleksi**: Riwayat tontonan, daftar Tonton Nanti, dan video yang disukai.
- 🔥 **Halaman Trending**: Peringkat video paling banyak ditonton dengan badge rank #1, #2, #3.

---

## 🚀 Cara Menjalankan Proyek

### Opsi 1: Menjalankan dengan Docker Compose (Satu Perintah ke Port 3999)

Pastikan Docker Desktop sudah berjalan di komputer Anda, lalu jalankan perintah berikut:

```bash
docker-compose up --build -d
```
atau
```bash
docker compose up --build -d
```

Website streaming **yohanex** akan langsung dapat diakses di:
👉 **`http://localhost:3999`**

Untuk menghentikan container:
```bash
docker-compose down
```

---

### Opsi 2: Menjalankan Secara Lokal (Node.js)

1. **Instal dependensi**:
   ```bash
   npm install
   ```

2. **Jalankan server pengembangan (dev server)**:
   ```bash
   npm run dev
   ```

3. **Buka di peramban**:
   Akses `http://localhost:5173`

4. **Build untuk produksi**:
   ```bash
   npm run build
   ```

---

## 🛠️ Tech Stack

- **Framework**: [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vite.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
