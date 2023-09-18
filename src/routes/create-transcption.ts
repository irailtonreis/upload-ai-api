import { FastifyInstance } from 'fastify'
import { promisify } from 'node:util'
import { pipeline } from 'node:stream'
import { z } from 'zod'
const pump = promisify(pipeline)

export async function createTranscriptionRoute(app: FastifyInstance){

app.post('/videos/:videoId/transcription', async (request, reply) => {
   const paramsSchema = z.object({
    videoId: z.string().uuid()
   })
   const { videoId } = paramsSchema.parse(request.params)

   const bodySchema = z.object({
      prompt: z.string(),
   })  

   const { prompt } = bodySchema.parse(request.body)

   return {
      videoId,
      prompt,
   }
})


}