import { Request, Response } from 'express'
import axios from 'axios'
import logger from '../../../utils/logger'

export async function fetch (req: Request, res: Response) {
  const {
    omitScript = false,
    url = undefined
  } = req?.query
  if (!url) { return }
  try {
    const { data } = await axios.get(
      'https://publish.twitter.com/oembed',
      {
        params: {
          omit_script: omitScript,
          url
        }
      }
    )
    return res.json(data)
  } catch (error:any) {
    const { message } = error
    const { status } = error?.response

    // logger.error(error.status)
    res.status(status).json({
      status,
      message
    })
  }

}
