'use server'

import { client } from '@/api/client'

export async function getGroupByID(id: number) {
  const { data } = await client.GET('/api/v1/groups/{groupID}', {
    params: {
      path: {
        groupID: id,
      },
    },
  })

  return data?.result
}
