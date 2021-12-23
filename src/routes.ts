import { Express, Request, Response } from 'express'

import { fetch as facebookFetch } from './controllers/api/v1/facebook'
import { fetch as twitterFetch } from './controllers/api/v1/twitter'
import { fetch as youtubeFetch } from './controllers/api/v1/youtube'

import { getFacebookQuerySchema } from './schema/facebook.schema'
import { getTwitterQuerySchema } from './schema/twitter.schema'
import { getYoutubeQuerySchema } from './schema/youtube.schema'
import validateResource from './middleware/validateResource'

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
   *         name: omit_script
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
  app.get('/api/v1/twitter', validateResource(getTwitterQuerySchema), twitterFetch)

  /**
   * @swagger
   * /api/v1/youtube:
   *   get:
   *     summary: Rute untuk mengambil konten oembed Youtube.
   *     description: Rute untuk mengambil konten oembed Youtube, memerlukan kueri id video yang dimaksud `v` (wajib).
   *     parameters:
   *       - in: query
   *         name: v
   *         description: Id dari video youtube
   *         required: true
   *         style: form
   *         allowEmptyValue: false
   *         example: Fpe1wNTXbJI
   *     responses:
   *       200:
   *         description: Oke
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 title:
   *                   type: string
   *                   example: MotoGP Pamungkas Rossi"
   *                 author_name:
   *                   type: string
   *                   example: Harian Kompas
   *                 author_url:
   *                   type: string
   *                   example: https://www.youtube.com/c/HarianKompasCetak
   *                 type:
   *                   type: string
   *                   example: video
   *                 height:
   *                   type: number
   *                   example: 113
   *                 width:
   *                   type: number
   *                   example: 200
   *                 version:
   *                   type: string
   *                   example: 1.0
   *                 provider_name:
   *                   type: string
   *                   example: YouTube
   *                 provider_url:
   *                   type: string
   *                   example: https://www.youtube.com/
   *                 thumbnail_height:
   *                   type: number,
   *                   example: 360
   *                 thumbnail_width:
   *                   type: number,
   *                   example: 480
   *                 thumbnail_url:
   *                   type: string
   *                   example: https://i.ytimg.com/vi/Fpe1wNTXbJI/hqdefault.jpg
   *                 html:
   *                   type: string
   *                   example: <iframe width="200" height="113" src="https://www.youtube.com/embed/Fpe1wNTXbJI?feature=oembed" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
   *       404:
   *         description: Video tidak ditemukan
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
  app.get('/api/v1/youtube', validateResource(getYoutubeQuerySchema), youtubeFetch)

  /**
   * @swagger
   * /api/v1/facebook:
   *   get:
   *     summary: Rute untuk mengambil konten oembed Facebook.
   *     description: Rute untuk mengambil konten oembed post Facebook, memerlukan kueri `url` (wajib), `omitscript` (boleh kosong) dam `useiframe` (boleh kosong).
   *     parameters:
   *       - in: query
   *         name: url
   *         description: URL ke post bersangkutan
   *         required: true
   *         style: form
   *         allowEmptyValue: false
   *         example: https://www.facebook.com/hariankompas/posts/5195973113765088
   *       - in: query
   *         name: omitscript
   *         description: Menentukan apakah tag `<script>` disertakan dalam bodi respons dari Facebook. Nilai default `false`
   *         required: false
   *         allowEmptyValue: true
   *         example: true
   *       - in: query
   *         name: useiframe
   *         description: Menentukan apakah menggunakan tag `<iframe>` secara keseluruhan dari Facebook. Nilai default `false`
   *         required: false
   *         allowEmptyValue: true
   *         example: true
   *       - in: query
   *         name: maxwidth
   *         description: Menentukan maxwidth container (max 750)
   *         required: false
   *         allowEmptyValue: true
   *         example: 550

   *     responses:
   *       200:
   *         description: Oke
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 author_name:
   *                   type: string
   *                   example: Harian Kompas
   *                 author_url:
   *                   type: string
   *                   example: https://www.facebook.com/197545083607941
   *                 provider_name:
   *                   type: string
   *                   example: Facebook
   *                 provider_url:
   *                   type: string
   *                   example: https://www.facebook.com/
   *                 html:
   *                   type: string
   *                   example: <div id="fb-root"></div> <script async="1" defer="1" crossorigin="anonymous" src="https://connect.facebook.net/id_ID/sdk.js#xfbml=1&amp;version=v12.0" nonce="bq6MTfzg"></script><div class="fb-post" data-href="https://www.facebook.com/hariankompas/posts/5195973113765088" data-width="550"><blockquote cite="https://graph.facebook.com/197545083607941/posts/5195973113765088/" class="fb-xfbml-parse-ignore"><p>Organisasi Kesehatan Dunia (WHO) 12 November 2021 menyebutkan, setidaknya 30 juta orang dengan diabetes yang membutuhkan insulin masih kesulitan untuk mengaksesnya.</p>Posted by <a href="https://www.facebook.com/197545083607941">Harian Kompas</a> on&nbsp;<a href="https://graph.facebook.com/197545083607941/posts/5195973113765088/">Tuesday, December 7, 2021</a></blockquote></div>
   *                 type:
   *                   type: string
   *                   example: rich
   *                 version:
   *                   type: string
   *                   example: 1.0
   *                 width:
   *                   type: number
   *                   example: 552
   *       404:
   *         description: Tautan tak ditemukan
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
  app.get('/api/v1/facebook', validateResource(getFacebookQuerySchema), facebookFetch)
}

export default routes
