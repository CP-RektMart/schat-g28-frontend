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

// export async function addFriend(payload: AddFriendActionProps) {
//   if (!payload.userId) {
//     console.error('User ID is required')
//     return
//   }

//   const session = await auth()

//   const response = await fetch(
//     `${process.env.BACKEND_URL}/api/v1/friends/${payload.userId}`,
//     {
//       method: 'POST',
//       headers: {
//         Authorization: `Bearer ${session?.accessToken}`,
//         'Content-Type': 'application/json',
//       },
//     }
//   )

//   console.log('response', await response.text())

//   if (!response.ok) {
//     console.error('Failed to add friend')
//     return
//   }

//   return
// }
