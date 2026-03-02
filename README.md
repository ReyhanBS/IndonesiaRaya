# Pemutar Video Indonesia Raya (Jam 10 Pagi)

Web app sederhana untuk memutar video Indonesia Raya otomatis setiap hari pukul **10:00** waktu lokal perangkat pengguna.

## Fitur
- Pemutaran otomatis saat jam menunjukkan 10:00.
- Hanya diputar sekali per hari (disimpan di `localStorage`).
- Bisa simpan URL video sendiri.
- Tombol **Putar Sekarang** untuk uji coba manual.

## Menjalankan
Buka `index.html` langsung di browser atau jalankan server statis:

```bash
python3 -m http.server 8000
```

Lalu buka `http://localhost:8000`.

## Catatan
Beberapa browser bisa memblokir autoplay dengan suara. Jika itu terjadi, klik **Putar Sekarang**.
