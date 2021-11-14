/**
 * Logger untuk menampilkan info/pesan di terminal
 * Dokumentasi:
 * https://github.com/pinojs/pino
 * https://github.com/pinojs/pino-pretty
 */
import pino from 'pino'

const logger = pino({
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
      ignore: 'pid,hostname',
      translateTime: true
    }
  }
})

export default logger
