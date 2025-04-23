'use server'

import { client } from '@/api/client'
import { auth } from '@/auth'
import { User } from '@/types/user'

export async function getUsersActive() {
  const { data } = await client.GET('/api/v1/users/active')

  const session = await auth()

  return data?.result?.filter((user: User) => {
    return user.id !== session?.user?.userId
  })
}
