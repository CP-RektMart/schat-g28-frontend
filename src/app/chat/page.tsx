import { getGroups } from '@/actions/group/get-groups'
import { getUsers } from '@/actions/user/get-users'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'

import ChatPageComponent from '@/components/chat'
import { me } from '@/actions/me/get-me'

export default async function ChatPage() {
  const profile = await me();

  if (!profile || !profile.result) {
    redirect("/");
  }

  const session = await auth();

  const friends = await getUsers()
  const groups = await getGroups()

  const currentUser = profile.result

  return (
    <ChatPageComponent
      friends={friends || []}
      groups={groups || []}
      currentUser={currentUser}
      accessToken={session?.accessToken || ''}
    />
  )
}
