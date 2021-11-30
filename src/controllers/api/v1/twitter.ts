import { Request, Response } from 'express'
import axios from 'axios'
// import logger from '../../../utils/logger'

export async function fetch (req: Request, res: Response) {
  /**
   * Dokumentasi mengenai oembed API Twitter bisa diakses di
   * https://developer.twitter.com/en/docs/twitter-for-websites/oembed-api
   */
  const {
    omit_script = false,
    url = undefined
  } = req?.query
  if (!url) { return }
  try {
    const { data } = await axios.get(
      'https://publish.twitter.com/oembed',
      {
        params: {
          omit_script,
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
