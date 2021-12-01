/**
 * Utilitas untuk membuat instance murni server Express
 * Setelan CORS dan rute masuk sini
 */

import express from 'express'
import cors from 'cors'
import corsOptions from './cors'
import routes from '../routes'

export default () => {
  const app = express()
  app.use(cors(corsOptions))
  app.use(express.json())

  /**
   * Menjalankan rute-rute yang didefinisikan di ./routes.ts
   */
  routes(app)

  return app
}
