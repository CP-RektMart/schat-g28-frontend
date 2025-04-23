'use server'

import { client } from '@/api/client'
import { uploadObject } from '@/api/upload-object'
import { revalidatePath } from 'next/cache'

export interface CreateGroupActionProps {
  name: string
  memberIds: number[]
  groupPicture: File
}

export async function createGroup(payload: CreateGroupActionProps) {
  console.log(payload)

  const { url } = await uploadObject({
    file: payload.groupPicture,
  })

  if (!url) {
    console.error('Failed to upload profile picture')
    return
  }

  await client.POST('/api/v1/groups', {
    body: {
      name: payload.name,
      memberIds: payload.memberIds,
      profilePictureUrl: url,
    },
  })

  revalidatePath('/chat')

  return
}

// export async function createGroup(payload: CreateGroupActionProps) {
//   const session = await auth()

//   const { url } = await uploadObject({
//     file: payload.groupPicture,
//   })

//   if (!url) {
//     console.error('Failed to upload profile picture')
//     return
//   }

//   const response = await fetch(`${process.env.BACKEND_URL}/api/v1/groups`, {
//     method: 'POST',
//     headers: {
//       Authorization: `Bearer ${session?.accessToken}`,
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       name: payload.name,
//       members: payload.memberIds,
//       groupPicture: url,
//     }),
//   })

//   console.log('response', await response.text())

//   revalidatePath('/chat')

//   return
// }
