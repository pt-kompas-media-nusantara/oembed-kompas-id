import request from 'supertest'
import runServer from '../src/utils/server'

const app = runServer()

describe('/api/v1/facebook', () => {
  describe('given required url and optional omitscript queries are valid', () => {
    it('valid facebook url provided, it should return 200 status code', async () => {
      const response = await request(app).get('/api/v1/facebook?url=https://www.facebook.com/hariankompas/posts/5195973113765088')
      expect(response.statusCode).toBe(200)
      expect(response.body.html).toContain('<script')
    })

    it('valid facebook mobile url provided, it should return 200 status code', async () => {
      const response = await request(app).get('/api/v1/facebook?url=https://m.facebook.com/hariankompas/posts/5195973113765088')
      expect(response.statusCode).toBe(200)
      expect(response.body.html).toContain('<script')
    })

    it('omitscript value is true, it should return 200 status code and body.html does not contain "<script>" tag', async () => {
      const response = await request(app).get('/api/v1/facebook?url=https://www.facebook.com/hariankompas/posts/5195973113765088&omitscript=true')
      expect(response.statusCode).toBe(200)
      expect(response.body.html).not.toContain('<script')
    })

    it('omitscript value is false, it should return 200 status code and body.html contains "<script>" tag', async () => {
      const response = await request(app).get('/api/v1/facebook?url=https://www.facebook.com/hariankompas/posts/5195973113765088&omitscript=false')
      expect(response.statusCode).toBe(200)
      expect(response.body.html).toContain('<script')
    })

    it('omitscript value is 1, it should return 200 status code and body.html does not contain "<script>" tag', async () => {
      const response = await request(app).get('/api/v1/facebook?url=https://www.facebook.com/hariankompas/posts/5195973113765088&omitscript=1')
      expect(response.statusCode).toBe(200)
      expect(response.body.html).not.toContain('<script')
    })

    it('useiframe value is true, it should return 200 status code and body.html does contain "<iframe>" tag', async () => {
      const response = await request(app).get('/api/v1/facebook?url=https://www.facebook.com/hariankompas/posts/5195973113765088&useiframe=true')
      expect(response.statusCode).toBe(200)
      expect(response.body.html).toContain('<iframe')
    })

    it('useiframe value is 1, it should return 200 status code and body.html does contain "<iframe>" tag', async () => {
      const response = await request(app).get('/api/v1/facebook?url=https://www.facebook.com/hariankompas/posts/5195973113765088&useiframe=1')
      expect(response.statusCode).toBe(200)
      expect(response.body.html).toContain('<iframe')
    })
  })

  describe('given required url and optional omit_script queries are invalid', () => {
    it('invalid facebook url provided, it should return 400 status code', async () => {
      const response = await  request(app).get('/api/v1/facebook?url=https://www.facebook.com/hariankompas/tweet/123123123').expect(400)
    })

    it('invalid random url provided, it should return 400 status code', async () => {
      await request(app).get('/api/v1/facebook?url=https://www.twitter.com/interestingengineering/videos/1853181661418196').expect(400)
    })

    it('empty url provided, it should return 400 status code', async () => {
      await request(app).get('/api/v1/facebook?url=').expect(400)
    })

    it('no url provided, it should return 400 status code', async () => {
      await request(app).get('/api/v1/facebook').expect(400)
    })

    it('omitscript value is mbahmu_kiper, it should return 400 status code', async () => {
      const response = await request(app).get('/api/v1/facebook?url=https://www.facebook.com/hariankompas/posts/5195973113765088&omitscript=mbahmu_kiper')
      expect(response.statusCode).toBe(400)
    })

    it('omitscript value is t, it should return 400 status code', async () => {
      const response = await request(app).get('/api/v1/facebook?url=https://www.facebook.com/hariankompas/posts/5195973113765088&omitscript=t')
      expect(response.statusCode).toBe(400)
    })

    it('useiframe value is t, it should return 400 status code', async () => {
      const response = await request(app).get('/api/v1/facebook?url=https://www.facebook.com/hariankompas/posts/5195973113765088&useiframe=t')
      expect(response.statusCode).toBe(400)
    })
  })
})
