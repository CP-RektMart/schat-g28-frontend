import { getGroups } from '@/actions/group/get-groups'
import { me } from '@/actions/me/get-me'
import { getUsers } from '@/actions/user/get-users'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'

import ChatPageComponent from '@/components/chat'

export default async function ChatPage() {
  const profile = await me()

  if (!profile || !profile.result) {
    redirect('/')
  }

  const session = await auth()

  const groups = await getGroups()

  const currentUser = profile.result
  console.log('currentUser', currentUser)

  return (
    <ChatPageComponent
      groups={groups || []}
      currentUser={currentUser}
      accessToken={session?.accessToken || ''}
    />
  )
}
