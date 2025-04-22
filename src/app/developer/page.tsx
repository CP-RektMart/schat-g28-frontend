import { auth } from '@/auth'

import { Box } from '@/components/developer/box'

export default async function DeveloperPage() {
  const session = await auth()

  const accessToken = `Bearer ${session?.accessToken}`
  const refreshToken = `Bearer ${session?.refreshToken}`
  const expireAt = `${session?.expireAt}`

  return (
    <div className='space-y-4 px-16 py-4'>
      <h1 className='text-xl font-bold'>Developer Tools</h1>
      <Box title='Access Token' text={accessToken} />
      <Box title='Refresh Token' text={refreshToken} />
      <Box title='Expire Date' text={expireAt} />
    </div>
  )
}
