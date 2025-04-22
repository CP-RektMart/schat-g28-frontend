'use server'

import { client } from '@/api/client'

export async function getUserByID(id: number) {
  const { data } = await client.GET('/api/v1/users/{id}', {
    params: {
      path: {
        id: id,
      },
    },
  })

  return data?.result
}
