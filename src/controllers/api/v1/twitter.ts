import { Request, Response } from 'express'
import axios from 'axios'

export async function fetch (req: Request, res: Response) {
  const {
    omitScript = false,
    url = undefined
  } = req?.query
  if (!url) { return }

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
}
