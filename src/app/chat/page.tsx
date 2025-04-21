import { getFriends } from '@/actions/friend/get-friends'
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

  const friends = await getFriends()

  const currentUser = profile.result

  return (
    <ChatPageComponent
      friends={friends}
      currentUser={currentUser}
      accessToken={session?.accessToken || ''}
    />
  )
}
