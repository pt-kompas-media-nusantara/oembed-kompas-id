/**
 * Skema untuk rute /api/v1/instagram
 * Dokumentasi zod di https://github.com/colinhacks/zod
 */
 import { boolean, number, object, preprocess, string } from 'zod'

 const query = {
   query: object({
     url: string({
       invalid_type_error: 'Nilai url harus berupa teks',
       required_error: 'Nilai url diperlukan'
     }).min(1, 'Nilai url tidak boleh kosong')
       .refine(val => val.includes('instagram.com'), {
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
     hidecaption: preprocess(
			(val:any) => {
				/**
				 * Setelah di coba hanya bisa menggunakan true dan 1
				 */
				return [true, 1].includes(val)
			},
			boolean().nullish().optional(),
		 ),
		 maxwidth: preprocess(
      (val:any) => {
        /**
        * Chek yang di isikan berupa angka
        */
        const n = Number(val)
        const res = isNaN(n) ? 500 : n
        return res
      },
      number().int().optional()
    ),
   })
 }
 
 export const getInstagramQuerySchema = object({
   ...query
 })
 