'use server'

import { client } from '@/api/client'
import { revalidatePath } from 'next/cache'

interface UpdateMeAction {
  name?: string
  profilePictureUrl?: string
  color?: string
}

export async function updateMe(payload: UpdateMeAction) {
  console.log('Updating me', payload)
  await client.PATCH('/api/v1/me', {
    body: {
      name: payload.name,
      profilePictureUrl: payload.profilePictureUrl,
      color: payload.color,
    },
  })
  console.log('Updated me done', payload)

  revalidatePath('/chat')

  return
}
