import request from 'supertest'
import runServer from '../src/utils/server'

const app = runServer()

describe('Test Youtube', () => {
  it('Request id video youtube wPXtCygVMGw, it should return 200 status code', async () => {
    const response = await request(app).get('/api/v1/youtube?v=wPXtCygVMGw')
    expect(response.statusCode).toBe(200)
    expect(response.body.html).toContain('<iframe')
  })

  it('Request id video youtube empty, it should return 400 status code', async () => {
    const response = await request(app).get('/api/v1/youtube?v=')
    expect(response.statusCode).toBe(400)
    expect(response.body[0].message).toContain('Nilai v tidak boleh kosong')
  })
})
