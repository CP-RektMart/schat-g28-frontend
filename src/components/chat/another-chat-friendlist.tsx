import type { User } from '@/types/user'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export interface ChatFriendListProps {
  friends: User[]
  selectedUserId: number
  handleSelectUserId: (id: number) => void
}

export function AnotherChatFriendList({
  friends,
  selectedUserId,
  handleSelectUserId,
}: ChatFriendListProps) {
  if (!friends || friends.length === 0) {
    return (
      <div className='max-h-60 space-y-2 overflow-y-auto rounded-md border p-8 text-center text-base text-gray-300'>
        No friends found.
      </div>
    )
  }

  const selectedUser = friends.find((user) => user.id === selectedUserId)

  return (
    <>
      {friends.map((user) => (
        <div
          key={user.id}
          className={`flex cursor-pointer items-center justify-between rounded-md p-2 ${selectedUser?.id === user.id ? 'bg-gray-100' : ''}`}
          onClick={() => handleSelectUserId(user.id || -1)}
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
          {/* {selectedUsers?.some((u) => u.id === user.id) && (
            <div className='rm >ounded-full h-4 w-4 bg-gray-900'></div>
          )} */}
        </div>
      ))}
    </>
  )

  //   ;<div className='max-h-60 space-y-2 overflow-y-auto rounded-md p-2'>
  //     {friends.map((user) => (
  //       <div
  //         key={user.id}
  //         className={`flex cursor-pointer items-center justify-between rounded-md p-2 ${
  //           selectedUsers?.some((u) => u.id === user.id) ? 'bg-gray-100' : ''
  //         }`}
  //         onClick={() => handleSelectUsers(user)}
  //       >
  //         <div className='flex items-center space-x-3'>
  //           <Avatar className='h-8 w-8'>
  //             <AvatarImage src={user.profilePictureUrl} alt={user.name} />
  //             <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
  //           </Avatar>
  //           <div>
  //             <p className='text-sm font-medium'>{user.name}</p>
  //             <p className='text-xs text-gray-500'>{user.email}</p>
  //           </div>
  //         </div>
  //         {selectedUsers?.some((u) => u.id === user.id) && (
  //           <div className='rm >ounded-full h-4 w-4 bg-gray-900'></div>
  //         )}
  //       </div>
  //     ))}
  //   </div>
}
