'use server'

import { client } from '@/api/client'

export async function getGroups() {
  const { data } = await client.GET('/api/v1/groups')

  return data?.result
}
