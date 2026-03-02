# Pemutar Video Indonesia Raya (Jam 10 Pagi)

Web app sederhana untuk memutar video Indonesia Raya otomatis setiap hari pukul **10:00** waktu lokal perangkat pengguna.

## Fitur
- Sumber video langsung dari **file lokal yang dipilih**.
- Tidak ada upload/simpan video ke `localStorage`.
- Pemutaran otomatis saat jam menunjukkan 10:00.
- Hanya diputar sekali per hari (penanda tanggal disimpan di `localStorage`).
- Tombol **Putar Sekarang** untuk uji coba manual.
- Tombol **Reset Pilihan File** untuk menghapus file yang sedang dipilih.

## Menjalankan
Buka `index.html` langsung di browser atau jalankan server statis:

```bash
python3 -m http.server 8000
```

Lalu buka `http://localhost:8000`.

## Cara pakai
1. Klik pilih file, lalu pilih video Indonesia Raya dari komputer.
2. Tidak perlu upload/simpan ke localStorage.
3. Aplikasi akan memutar otomatis tiap pukul 10:00 selama halaman tetap terbuka.

## Catatan penting
- Karena file dipakai langsung dari pilihan user, setelah halaman direfresh biasanya perlu pilih file lagi.
- Beberapa browser bisa memblokir autoplay dengan suara. Jika itu terjadi, klik **Putar Sekarang**.
