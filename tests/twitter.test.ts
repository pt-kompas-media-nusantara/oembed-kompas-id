import request from 'supertest'
import { app } from '../src/app'

describe('/api/v1/twitter', () => {
  describe('given required url and optional omit_script queries are valid', () => {
    it('valid tweet url provided, it should return 200 status code', async () => {
      const response = await request(app).get('/api/v1/twitter?url=https://twitter.com/ixavieruncle/status/1368546562335371269')
      expect(response.statusCode).toBe(200)
      expect(response.body.html).toContain('<script')
    })

    it('omit_script value is true, it should return 200 status code and body.html does not contain "<script>" tag', async () => {
      const response = await request(app).get('/api/v1/twitter?url=https://twitter.com/ixavieruncle/status/1368546562335371269&omit_script=true')
      expect(response.statusCode).toBe(200)
      expect(response.body.html).not.toContain('<script')
    })

    it('omit_script value is false, it should return 200 status code and body.html contains "<script>" tag', async () => {
      const response = await request(app).get('/api/v1/twitter?url=https://twitter.com/ixavieruncle/status/1368546562335371269&omit_script=false')
      expect(response.statusCode).toBe(200)
      expect(response.body.html).toContain('<script')
    })

    it('omit_script value is 1, it should return 200 status code and body.html does not contain "<script>" tag', async () => {
      const response = await request(app).get('/api/v1/twitter?url=https://twitter.com/ixavieruncle/status/1368546562335371269&omit_script=1')
      expect(response.statusCode).toBe(200)
      expect(response.body.html).not.toContain('<script')
    })

    it('omit_script value is t, it should return 200 status code and body.html does not contain "<script>" tag', async () => {
      const response = await request(app).get('/api/v1/twitter?url=https://twitter.com/ixavieruncle/status/1368546562335371269&omit_script=t')
      expect(response.statusCode).toBe(200)
      expect(response.body.html).not.toContain('<script')
    })


  })

  describe('given required url and optional omit_script queries are invalid', () => {
    it('invalid tweet url provided, it should return 404 status code', async () => {
      const response = await request(app).get('/api/v1/twitter?url=https://twitter.com/ixavieruncle/status/1368546562335371269a')
      expect(response.statusCode).toBe(404)
    })

    it('invalid random url provided, it should return 400 status code', async () => {
      const response = await request(app).get('/api/v1/twitter?url=https://www.facebook.com/interestingengineering/videos/1853181661418196')
      expect(response.statusCode).toBe(400)
    })

    it('empty url provided, it should return 400 status code', async () => {
      const response = await request(app).get('/api/v1/twitter?url=')
      expect(response.statusCode).toBe(400)
    })

    it('no url provided, it should return 400 status code', async () => {
      const response = await request(app).get('/api/v1/twitter')
      expect(response.statusCode).toBe(400)
    })

    it('omit_script value is mbahmu_kiper, it should return 200 status code and body.html contains "<script>" tag', async () => {
      const response = await request(app).get('/api/v1/twitter?url=https://twitter.com/ixavieruncle/status/1368546562335371269&omit_script=mbahmu_kiper')
      expect(response.statusCode).toBe(200)
      expect(response.body.html).toContain('<script')
    })
  })
})
