import { Express, Request, Response } from 'express'
import swaggerJsDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import { version } from '../../package.json'
import logger from './logger'

const options: swaggerJsDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Dokumen API',
      version,
    }
  },
  apis: ['./src/routes.ts']
}

const swaggerSpec = swaggerJsDoc(options)

function swaggerDocs(app: Express, port: number) {
  // Rute untuk dokumentasi API
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

  // Rute untuk dokumentasi API dalam format JSON
  app.get('/docs.json', (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/json')
    res.send(swaggerSpec)
  })

  logger.info(`Dokumentasi tersedia di http://localhost:${port}/docs`)
}

export default swaggerDocs
