import { client } from '@/api/client'
import { redirect } from 'next/navigation'

import ChatPageComponent from '@/components/chat'

export default async function ChatPage() {
  const { response: profileResponse, data: profile } =
    await client.GET('/api/v1/me')

  if (profileResponse.status !== 200) {
    redirect('/')
  }

  if (!profile || !profile.result) {
    return <div></div>
  }

  const currentUser = profile.result

  return <ChatPageComponent currentUser={currentUser} />
}
