import express, { Request, Response } from 'express'
import config from 'config'
import cors from 'cors'
import corsOptions from './utils/cors'
import logger from './utils/logger'
import routes from './routes'
import swagerDocs from './utils/swagger'

export const app = express()
const port = config.get<number>('port')

app.use(cors(corsOptions))
app.use(express.json())

app.listen(port, () => {
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
