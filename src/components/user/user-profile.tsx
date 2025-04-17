import type { User } from '@/types/user'
import { LogOut } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { UserSettings } from '@/components/user/user-settings'

export interface UserProfileProps {
  currentUser: User
  handleLogout: () => void
}

export function UserProfile({ currentUser, handleLogout }: UserProfileProps) {
  return (
    <div className='flex items-center justify-between border-b p-4'>
      <div className='flex items-center space-x-3'>
        <Avatar>
          <AvatarImage
            src={currentUser.profilePictureUrl}
            alt={currentUser.name}
          />
          <AvatarFallback>{currentUser.name?.charAt(0) ?? 'U'}</AvatarFallback>
        </Avatar>
        <div className='max-w-40'>
          <h3 className='line-clamp-1 font-medium'>{currentUser.name}</h3>
          <span>ID: </span>
          <Badge variant={'secondary'} className='text-xs font-normal'>
            {currentUser.id}
          </Badge>
        </div>
      </div>
      <div>
        <UserSettings user={currentUser} />
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
