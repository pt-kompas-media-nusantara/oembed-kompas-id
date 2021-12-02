/**
 * Skema untuk rute /api/v1/youtube
 * Dokumentasi zod di https://github.com/colinhacks/zod
 */
 import { object, string } from 'zod'

 const query = {
   query: object({
     v: string({
       invalid_type_error: 'Nilai v harus berupa teks',
       required_error: 'Nilai v diperlukan'
     }).min(1, 'Nilai v tidak boleh kosong')
   })
 }
 
 export const getYoutubeQuerySchema = object({
   ...query
 })
 