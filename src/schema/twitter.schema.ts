/**
 * Skema untuk rute /api/v1/twitter
 * Dokumentasi zod di https://github.com/colinhacks/zod
 */
import { boolean, object, preprocess, string } from 'zod'

const query = {
  query: object({
    url: string({
      invalid_type_error: 'Nilai url harus berupa teks',
      required_error: 'Nilai url diperlukan'
    }).min(1, 'Nilai url tidak boleh kosong')
      .refine(val => val.includes('https://twitter.com/'), {
        message: 'Nilai url tidak mengandung alamat Twitter'
      }),
    omit_script: preprocess(
      (val:any) => {
        /**
         * Berdasarkan dokumentasi oembed API Twitter,
         * nilai true, "t", dan 1 dianggap true
         */
        return [true, 'true', 't', 1, '1'].includes(val)
      },
      boolean().nullish().optional()
    )
  })
}

export const getTwitterQuerySchema = object({
  ...query
})
