/**
 * Skema untuk rute /api/v1/facebook
 * Dokumentasi zod di https://github.com/colinhacks/zod
 */
 import { boolean, object, preprocess, string } from 'zod'

 const query = {
   query: object({
     url: string({
       invalid_type_error: 'Nilai url harus berupa teks',
       required_error: 'Nilai url diperlukan'
     }).min(1, 'Nilai url tidak boleh kosong')
       .refine(val => val.includes('facebook.com'), {
         message: 'Nilai url tidak mengandung alamat Facebook'
       }),
     omit_script: preprocess(
       (val:any) => {
         /**
          * Setelah di coba hanya bisa menggunakan true dan 1
          */
         return [true, 1].includes(val)
       },
       boolean().nullish().optional()
     ),
     useiframe: preprocess(
      (val:any) => {
        /**
         * Setelah di coba hanya bisa menggunakan true dan 1
         */
        return [true, 1].includes(val)
      },
      boolean().nullish().optional()
    )
   })
 }
 
 export const getFacebookQuerySchema = object({
   ...query
 })
 