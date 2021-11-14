import { Express, Request, Response } from 'express'

function routes (app: Express) {
  /**
   * Untuk keperluan cek kondisi aplikasi dan memastikan rute '/' bisa diakses
   * @returns {Object}
   */
  app.get('/', (req: Request, res: Response) => res.json({'ping': 'pong'}))
}

export default routes
