# Pemutar Video Indonesia Raya (Jam 10 Pagi)

Web app sederhana untuk memutar video Indonesia Raya otomatis setiap hari pukul **10:00** waktu lokal perangkat pengguna.

## Fitur
- Sumber video berasal dari **file lokal pengguna** (bukan link web).
- File video disimpan ke `localStorage` browser dalam format Data URL.
- Pemutaran otomatis saat jam menunjukkan 10:00.
- Hanya diputar sekali per hari (disimpan di `localStorage`).
- Tombol **Putar Sekarang** untuk uji coba manual.
- Tombol **Hapus Video Tersimpan** untuk reset data video.

## Menjalankan
Buka `index.html` langsung di browser atau jalankan server statis:

```bash
python3 -m http.server 8000
```

Lalu buka `http://localhost:8000`.

## Cara pakai
1. Klik pilih file, lalu pilih video Indonesia Raya dari komputer.
2. Klik **Simpan ke Local Storage**.
3. Aplikasi akan memutar otomatis tiap pukul 10:00 (sekali per hari).

## Catatan penting
- `localStorage` punya batas ukuran (umumnya sekitar 5MB per origin), jadi jika file terlalu besar, penyimpanan bisa gagal.
- Beberapa browser bisa memblokir autoplay dengan suara. Jika itu terjadi, klik **Putar Sekarang**.
