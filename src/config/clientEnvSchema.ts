import z from 'zod'

const envSchema = z.object({
  NEXT_PUBLIC_WEBSOCKET_URL: z.string(),
})

export const envClientSchema = envSchema.parse({
  BACKEND_URL: process.env.BACKEND_URL,
  NEXT_PUBLIC_WEBSOCKET_URL: process.env.NEXT_PUBLIC_WEBSOCKET_URL,
})
