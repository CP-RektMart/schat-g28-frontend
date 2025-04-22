'use server'

import { client } from '@/api/client'

export async function getDirectMessageHistory(userId: number) {
  const { data } = await client.GET('/api/v1/users/{id}', {
    params: {
      path: { id: userId },
    },
  })

  // console.log(data.result.messages)

  return data?.result
}

export async function getGroupMessageHistory(groupId: number) {
  const { data } = await client.GET('/api/v1/groups/{groupID}', {
    params: {
      path: { groupID: groupId },
    },
  })

  return data?.result
}
