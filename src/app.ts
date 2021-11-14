import express, { Request, Response } from 'express'
import config from 'config'
import routes from './routes'

const app = express()
const port = config.get<number>('port')

app.use(express.json())

app.listen(port, async () => {
  /**
   * Mengeluarkan pesan di konsol terminal bahwa aplikasi
   * sedang berjalan beserta informasi host & port
   */
  console.log(`Aplikasi jalan di http://localhost:${port}`)

  /**
   * Menjalankan rute-rute yang didefinisikan di ./routes.ts
   */
  routes(app)
})
