'use server'

import { uploadObject } from '@/api/upload-object'

import { updateMe } from './update-me'

export async function updateProfilePicture(file: File) {
  const { url } = await uploadObject({ file })
  await updateMe({ profilePictureUrl: url })
}
