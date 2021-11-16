# oembed-kompas-id

Layanan mikro untuk mengambil data oembed dari media sosial

## Instalasi

Sementara ini cukup ambil repositori ini di ranting pengembangan (*development*) 
lalu jalankan `npm install`

## Pengoperasian (Pengembangan)

`npm run dev`

Aplikasi jalan di http://localhost:3003

## Pengoperasian (Produksi)

```bash
npm run build
node dist/src/app.js
```

## Dokumentasi

Dokumentasi penggunaan API bisa dicek di di http://localhost:3003/docs dan di http://localhost:3003/docs.json (format JSON).
Rekan-rekan pengembang diharapkan rajin menuliskan dokumentasi untuk setiap fungsi dan rute. 
Cara penggunaan OpenAPI di Swagger bisa dibaca di https://swagger.io/docs/specification/basic-structure/
