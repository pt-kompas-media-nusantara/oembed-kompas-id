import { Request, Response } from 'express'
import axios from 'axios'
require('dotenv').config()

export async function fetch (req: Request, res: Response) {
  const {
    url = undefined,
    omitscript = false,
    useiframe = false
  } = req?.query
  if (!url) { return }
  try {
    const { data } = await axios.get(
      'https://graph.facebook.com/oembed_post',
      {
        params: {
          url: url,
          access_token: process.env.ACCESS_TOKEN_FB,
          omitscript,
          useiframe
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
