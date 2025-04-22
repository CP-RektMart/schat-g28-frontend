import { logout } from '@/actions/me/logout'
import type { User } from '@/types/user'
import { LogOut } from 'lucide-react'
import { signOut } from 'next-auth/react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { UserSettings } from '@/components/user/user-settings'

export interface UserProfileProps {
  myProfile: User
}

export function UserProfile({ myProfile }: UserProfileProps) {
  const handleLogout = async () => {
    const result = await logout()
    if (result?.error) {
      console.error(result.error)
      return
    }
    await signOut({
      redirect: true,
      redirectTo: '/',
    })
  }

  return (
    <div className='flex items-center justify-between border-b p-4'>
      <div className='flex items-center space-x-3'>
        <Avatar>
          <AvatarImage src={myProfile.profilePictureUrl} alt={myProfile.name} />
          <AvatarFallback>{myProfile.name?.charAt(0) ?? 'U'}</AvatarFallback>
        </Avatar>
        <div className='max-w-40'>
          <h3 className='line-clamp-1 font-medium'>{myProfile.name}</h3>
          <span>ID: </span>
          <Badge variant={'secondary'} className='text-xs font-normal'>
            {myProfile.id}
          </Badge>
        </div>
      </div>
      <div>
        <UserSettings user={myProfile} />
        <Button
          variant='ghost'
          size='icon'
          onClick={handleLogout}
          title='Logout'
        >
          <LogOut className='h-5 w-5' />
        </Button>
      </div>
    </div>
  )
}
