'user server'

import { client } from '@/api/client'
import { uploadObject } from '@/api/upload-object'
import { revalidatePath } from 'next/cache'

export interface CreateGroupActionProps {
  name: string
  memberIds: number[]
  profilePictureUrl: File
}

export async function createGroup(payload: CreateGroupActionProps) {
  const { url } = await uploadObject({
    file: payload.profilePictureUrl,
  })

  if (!url) {
    console.error('Failed to upload profile picture')
    return
  }

  await client.POST('/api/v1/groups', {
    body: {
      name: payload.name,
      profilePictureUrl: url,
      memberIds: payload.memberIds,
    },
  })

  revalidatePath('/chat')

  return
}
