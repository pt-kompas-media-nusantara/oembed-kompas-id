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
     }).nonempty({ message: 'Nilai v tidak boleh kosong' })
   })
 }
 
 export const getYoutubeQuerySchema = object({
   ...query
 })
 