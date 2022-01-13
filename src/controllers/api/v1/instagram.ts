import { Request, Response } from 'express'
import axios from 'axios'
require('dotenv').config()

export async function fetch (req: Request, res: Response) {
  const {
    url = undefined,
    omitscript = false,
    hidecaption = false,
		maxwidth= false,
  } = req?.query
  if (!url) { return }
  try {
    const { data } = await axios.get(
      'https://graph.facebook.com/instagram_oembed',
      {
        params: {
          url: url,
          access_token: process.env.ACCESS_TOKEN_FB,
          omitscript,
          hidecaption,
					maxwidth
        }
      }
    )
    return res.json(data)
  } catch (error:any) {
    const { message } = error
    const { status } = error?.response

    res.status(status).json({
      status,
      message
    })
  }

}
