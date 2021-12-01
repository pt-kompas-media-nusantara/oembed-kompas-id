import { Request, Response } from 'express'
import axios from 'axios'

export async function fetch (req: Request, res: Response) {
  const {
    v = undefined
  } = req?.query
  if (!v) { return }
  try {
    const { data } = await axios.get(
      'https://www.youtube.com/oembed',
      {
        params: {
          url: 'https://www.youtube.com/watch?v=' + v,
          format: 'json'
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
