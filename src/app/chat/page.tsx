import { getGroups } from '@/actions/group/get-groups'
import { getUsers } from '@/actions/user/get-users'
import { client } from '@/api/client'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'

import ChatPageComponent from '@/components/chat'

export default async function ChatPage() {
  const { response: profileResponse, data: profile } =
    await client.GET('/api/v1/me')

  const session = await auth()

  if (profileResponse.status !== 200) {
    redirect('/')
  }

  if (!profile || !profile.result) {
    return <div></div>
  }

  const friends = await getUsers()
  const groups = await getGroups()

  const currentUser = profile.result

  return (
    <ChatPageComponent
      friends={friends}
      groups={groups}
      currentUser={currentUser}
      accessToken={session?.accessToken || ''}
    />
  )
}
