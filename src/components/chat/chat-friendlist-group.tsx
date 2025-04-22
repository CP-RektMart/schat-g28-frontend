import { cn } from '@/lib/utils'
import type { User } from '@/types/user'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ScrollArea } from '@/components/ui/scroll-area'

export interface ChatFriendListProps {
  friends: User[] | undefined
  selectUsers?: number[]
  handleSelectUser: (idx: number) => void
}

export function ChatFriendListGroup({
  friends,
  selectUsers,
  handleSelectUser,
}: ChatFriendListProps) {
  if (!friends || friends.length === 0) {
    return (
      <div className='max-h-60 space-y-2 overflow-y-auto rounded-md border p-8 text-center text-base text-gray-300'>
        No friends found.
      </div>
    )
  }

  return (
    <ScrollArea className='h-64 w-full rounded-md border'>
      {friends.map((user) => (
        <div
          key={user.id}
          className={cn(
            'flex cursor-pointer items-center justify-between rounded-md p-2',
            selectUsers?.includes(user.id as number) ? 'bg-gray-100' : ''
          )}
          onClick={() => handleSelectUser(user.id as number)}
        >
          <div className='flex items-center space-x-3'>
            <Avatar className='h-8 w-8'>
              <AvatarImage src={user.profilePictureUrl} alt={user.name} />
              <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className='text-sm font-medium'>{user.name}</p>
              <p className='text-xs text-gray-500'>{user.email}</p>
            </div>
          </div>
        </div>
      ))}
    </ScrollArea>
  )
}
