/**
 * Dokumentasi: https://www.npmjs.com/package/cors
 *
 * Cara menguji:
 * 1. Di terminal jalankan `curl -H "Origin: http://localhost:3000" --head http://localhost:3003`
 * 2. Jika di respons ada *header* `Access-Control-Allow-Origin: http://localhost:3000`,
 *    ini berarti http://localhost:3000 bisa mengakses aplikasi dari sisi klien
 */

import cors from 'cors'

// Daftar origin yang diperbolehkan mengakses aplikasi ini dari sisi klien
// TODO: Menggunakan regex supaya tidak mengetik banyak origin
const allowedOrigins = [
  'http://localhost:3000',
  'http://www.kompas.local:3000',
  'https://www.kompas.cloud',
  'https://www.kompas.id',
  'https://www-beta.kompas.id',
  'https://preview.kompas.cloud',
  'https://preview.kompas.id'
]

// Masukkan ke opsi cors
const corsOptions: cors.CorsOptions = {
  origin: allowedOrigins
}

export default corsOptions
