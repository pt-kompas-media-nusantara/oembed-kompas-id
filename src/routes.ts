import { Express, Request, Response } from 'express'

function routes (app: Express) {
  /**
   * @swagger
   * /:
   *   get:
   *     summary: Rute untuk mengecek kondisi aplikasi
   *     description: Rute untuk mengecek kondisi aplikasi. Mengembalikan respons berstatus 200 berupa obyek jika aplikasi sedang berjalan.
   *     responses:
   *       200:
   *         description: Oke
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 ping:
   *                   type: string
   *                   example: pong
   */
  app.get('/', (req: Request, res: Response) => res.json({'ping': 'pong'}))
}

export default routes
