import config from 'config'
import logger from './utils/logger'
import runServer from './utils/server'
import swagerDocs from './utils/swagger'

const app = runServer()
const port = config.get<number>('port')

app.listen(port, () => {
  /**
   * Mengeluarkan pesan di konsol terminal bahwa aplikasi
   * sedang berjalan beserta informasi host & port
   */
  logger.info(`Aplikasi jalan di http://localhost:${port}`)

  /**
   * Dokumentasi Swagger
   */
  swagerDocs(app, port)
})
