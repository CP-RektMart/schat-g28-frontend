'use server'

import { client } from '@/api/client'

export async function joinGroup(id: number) {
  const {response, error} = await client.GET('/api/v1/groups/{groupID}/join', {
    params: {
      path: {
        groupID: id,
      },
    },
  })

  if (!response.ok) {
    return {error: error?.error}
  }
}
