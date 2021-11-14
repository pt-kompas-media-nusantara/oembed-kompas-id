import express, { Request, Response } from 'express'
import config from 'config'
import cors from 'cors'
import logger from './utils/logger'
import routes from './routes'
import swagerDocs from './utils/swagger'

const app = express()
const port = config.get<number>('port')

// Daftar origin yang diperbolehkan mengakses aplikasi ini dari sisi klien
const allowedOrigins = ['http://localhost:3000', 'http://www.kompas.local:3000', 'https://www.kompas.id', 'https://preview.kompas.id']
const corsOptions: cors.CorsOptions = {
  origin: allowedOrigins
}
app.use(cors(corsOptions))

app.use(express.json())

app.listen(port, async () => {
  /**
   * Mengeluarkan pesan di konsol terminal bahwa aplikasi
   * sedang berjalan beserta informasi host & port
   */
  logger.info(`Aplikasi jalan di http://localhost:${port}`)

  /**
   * Menjalankan rute-rute yang didefinisikan di ./routes.ts
   */
  routes(app)

  /**
   * Dokumentasi Swagger
   */
  swagerDocs(app, port)
})
