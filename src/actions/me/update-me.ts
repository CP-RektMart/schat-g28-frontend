'use server'

import { client } from '@/api/client'
import { revalidatePath } from 'next/cache'

interface UpdateMeAction {
  name: string
}

export async function updateMe(payload: UpdateMeAction) {
  await client.PATCH('/api/v1/me', {
    body: {
      name: payload.name,
    },
  })

  revalidatePath('/chat')

  return
}
