'use server'

import { client } from '@/api/client'
import { redirect } from 'next/navigation'

export async function me() {
  const { response: profileResponse, data: profile } =
    await client.GET('/api/v1/me')

  if (!profileResponse.ok) {
    console.error('failed get me');
  }

  return profile
}
