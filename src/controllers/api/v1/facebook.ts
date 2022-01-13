import { Request, Response } from 'express'
import axios from 'axios'
require('dotenv').config()

export async function fetch (req: Request, res: Response) {
  const {
    url = undefined,
    omitscript = false,
    useiframe = false,
    maxwidth = undefined
  } = req?.query
  if (!url) { return }
  const oembedString = (url || '').toString().toLowerCase().includes('videos') ? 'oembed_video' : 'oembed_post'
  try {
    const { data } = await axios.get(
      `https://graph.facebook.com/${ oembedString }`,
      {
        params: {
          url: url,
          access_token: process.env.ACCESS_TOKEN_FB,
          omitscript,
          useiframe,
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
