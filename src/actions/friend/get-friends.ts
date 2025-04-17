'use server'

import { client } from '@/api/client'

export async function getFriends() {
  const { data } = await client.GET('/api/v1/friends')

  return data?.result
}
