import { Express, Request, Response } from 'express'

import { fetch as twitterFetch } from './controllers/api/v1/twitter'

function routes (app: Express) {
  /**
   * @swagger
   * /:
   *   get:
   *     summary: Rute untuk mengecek kondisi aplikasi
   *     description: Rute untuk mengecek kondisi aplikasi, mengembalikan respons berstatus 200 berupa obyek jika aplikasi sedang berjalan.
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

  /**
   * @swagger
   * /api/v1/twitter:
   *   get:
   *     summary: Rute untuk mengambil konten oembed Twitter.
   *     description: Rute untuk mengambil konten oembed Twitter, memerlukan kueri `url` (wajib) dan `omitScript` (manasuka).
   *     parameters:
   *       - in: query
   *         name: url
   *         description: URL ke cuitan bersangkutan
   *         required: true
   *         style: form
   *         allowEmptyValue: false
   *         example: https://twitter.com/ixavieruncle/status/1457667985817042951
   *       - in: query
   *         name: omitScript
   *         description: Menentukan apakah tag `<script>` disertakan dalam bodi respons dari Twitter. Nilai default `false`
   *         required: false
   *         allowEmptyValue: true
   *         example: true
   *     responses:
   *       200:
   *         description: Oke
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 url:
   *                   type: string
   *                   example: https://twitter.com/ixavieruncle/status/1457667985817042951
   *                 author_name:
   *                   type: string
   *                   example: Uncle
   *                 author_url:
   *                   type: string
   *                   example: https://twitter.com/ixavieruncle
   *                 html:
   *                   type: string
   *                   example: <blockquote class="twitter-tweet"><p lang="en" dir="ltr">Men&#39;s perfume last longer than their promises</p>&mdash; Uncle (@ixavieruncle) <a href="https://twitter.com/ixavieruncle/status/1457667985817042951?ref_src=twsrc%5Etfw">November 8, 2021</a></blockquote>\n
   *                 width:
   *                   type: number
   *                   example: 550
   *                 height:
   *                   type: number
   *                   example: null
   *                   nullable: true
   *                 type:
   *                   type: string
   *                   example: rich
   *                 cache_age:
   *                   type: string
   *                   example: 3153600000
   *                 provider_name:
   *                   type: string
   *                   example: Twitter
   *                 provider_url:
   *                   type: string
   *                   example: https://twitter.com
   *                 version:
   *                   type: string
   *                   example: 1.0
   *       404:
   *         description: Cuitan tak ditemukan
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status:
   *                   type: number
   *                   example: 404
   *                 message:
   *                   type: string
   *                   example: Request failed with status code 404
   */
  app.get('/api/v1/twitter', twitterFetch)
}

export default routes
