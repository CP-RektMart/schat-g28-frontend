'use server'

import { client } from '@/api/client'
import { revalidatePath } from 'next/cache'

export interface AddFriendActionProps {
  userId: number
}

export async function addFriend(payload: AddFriendActionProps) {
  if (!payload.userId) {
    console.error('User ID is required')
    return
  }

  await client.POST('/api/v1/friends/{friendID}', {
    params: {
      path: {
        friendID: payload.userId,
      },
    },
  })

  revalidatePath('/chat')

  return
}
