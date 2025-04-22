'use server'

import { uploadObject } from '@/api/upload-object'
import { auth } from '@/auth'

import { updateMe } from './update-me'

export async function updateProfilePicture(file: File) {
  const session = await auth()
  if (!session) throw new Error('Unauthorized')

  const { url } = await uploadObject({ file })
  await updateMe({ profilePictureUrl: url })
}
