'use server'

import { client } from '@/api/client'
import { revalidatePath } from 'next/cache'

interface UpdateMeAction {
  name?: string
  profilePictureUrl?: string
}

export async function updateMe(payload: UpdateMeAction) {
  await client.PATCH('/api/v1/me', {
    body: {
      name: payload.name,
      profilePictureUrl: payload.profilePictureUrl,
    },
  })

  revalidatePath('/chat')

  return
}
