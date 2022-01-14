import request from 'supertest'
import runServer from '../src/utils/server'

const app = runServer()

describe('/api/v1/instagram', () => {
  describe('given required url and optional omitscript queries are valid', () => {
    it('valid instagram url provided, it should return 200 status code', async () => {
      const response = await request(app).get('/api/v1/instagram?url=https://www.instagram.com/p/CYoXLVOvOU0')
      expect(response.statusCode).toBe(200)
      expect(response.body.html).toContain('<script')
    })

    it('valid facebook mobile url provided, it should return 200 status code', async () => {
      const response = await request(app).get('/api/v1/instagram?url=https://www.instagram.com/p/CYlLYnlLEpR/?utm_source=ig_web_button_share_sheet')
      expect(response.statusCode).toBe(200)
      expect(response.body.html).toContain('<script')
    })

    it('omitscript value is true, it should return 200 status code and body.html does not contain "<script>" tag', async () => {
      const response = await request(app).get('/api/v1/instagram?url=https://www.instagram.com/p/CYlLYnlLEpR/?utm_source=ig_web_button_share_sheet&omitscript=true')
      expect(response.statusCode).toBe(200)
      expect(response.body.html).not.toContain('<script')
    })

    it('omitscript value is false, it should return 200 status code and body.html contains "<script>" tag', async () => {
      const response = await request(app).get('/api/v1/instagram?url=https://www.instagram.com/p/CYlLYnlLEpR/&omitscript=false')
      expect(response.statusCode).toBe(200)
      expect(response.body.html).toContain('<script')
    })

    it('omitscript value is 1, it should return 200 status code and body.html does not contain "<script>" tag', async () => {
      const response = await request(app).get('/api/v1/instagram?url=https://www.instagram.com/p/CYlLYnlLEpR/?utm_source=ig_web_button_share_sheet&omitscript=1')
      expect(response.statusCode).toBe(200)
      expect(response.body.html).not.toContain('<script')
    })

    it('hidecaption value is true, it should return 200 status code and show caption"<iframe>" tag', async () => {
      const response = await request(app).get('/api/v1/instagram?url=https://www.instagram.com/p/CYlLYnlLEpR/&hidecaption=true')
      expect(response.statusCode).toBe(200)
    })

    it('hidecaption value is 1, it should return 200 status code and show caption', async () => {
      const response = await request(app).get('/api/v1/instagram?url=https://www.instagram.com/p/CYlLYnlLEpR/&hidecaption=1')
      expect(response.statusCode).toBe(200)
    })

    it('maxwidth value is 658, it should return 200 status code and body.html does contain "data-width=`658`" tag', async () => {
      const response = await request(app).get('/api/v1/instagram?url=https://www.instagram.com/p/CYlLYnlLEpR/&maxwidth=658')
      expect(response.statusCode).toBe(200)
      expect(response.body.html).toContain('max-width:658px')
    })
  })

  describe('given required url and optional omit_script queries are invalid', () => {
    it('invalid instagram url provided, it should return 400 status code', async () => {
      const response = await  request(app).get('/api/v1/instagram?url=https://www.instagram.com/p/CYlLYnlLEp').expect(400)
    })

    it('invalid random url provided, it should return 400 status code', async () => {
      await request(app).get('/api/v1/instagram?url=https://www.twitter.com/interestingengineering/videos/1853181661418196').expect(400)
    })

    it('empty url provided, it should return 400 status code', async () => {
      await request(app).get('/api/v1/instagram?url=').expect(400)
    })

    it('no url provided, it should return 400 status code', async () => {
      await request(app).get('/api/v1/instagram').expect(400)
    })

    it('omitscript value is lain_lain, it should return 400 status code', async () => {
      const response = await request(app).get('/api/v1/instagram?url=https://www.instagram.com/p/CYoXLVOvOU0&omitscript=lain_lain')
      expect(response.statusCode).toBe(400)
    })

    it('hidecaption value is no, it should return 400 status code', async () => {
      const response = await request(app).get('/api/v1/instagram?url=https://www.instagram.com/p/CYoXLVOvOU0&hidecaption=no')
      expect(response.statusCode).toBe(400)
    })

    it('maxwidth value is 0, it should return 400 status code', async () => {
      const response = await request(app).get('/api/v1/instagram?url=https://www.instagram.com/p/CYoXLVOvOU0&maxwidth=p')
      expect(response.statusCode).toBe(400)
    })
  })
})
