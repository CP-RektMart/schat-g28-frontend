import { Group } from '@/types/group'
import type { User } from '@/types/user'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export interface ChatGroupListProps {
  groups: Group[]
  selectGroupId: number
  setSelectedGroupId: (id: number) => void
}

export function ChatGroupList({
  groups,
  selectGroupId,
  setSelectedGroupId,
}: ChatGroupListProps) {
  if (!groups || groups.length === 0) {
    return (
      <div className='max-h-60 space-y-2 overflow-y-auto rounded-md border p-8 text-center text-base text-gray-300'>
        No friends found.
      </div>
    )
  }

  const selectedGroup = groups.find((group) => group.id === selectGroupId)

  return (
    <>
      {groups.map((gr) => (
        <div
          key={gr.id}
          className={`flex cursor-pointer items-center justify-between rounded-md p-2 ${selectedGroup?.id === gr.id ? 'bg-gray-100' : ''}`}
          onClick={() => setSelectedGroupId(gr.id as number)}
        >
          <div className='flex items-center space-x-3'>
            <Avatar className='h-8 w-8'>
              <AvatarImage src={gr.profilePictureURL} alt={gr.name} />
              <AvatarFallback>{gr.name?.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className='text-sm font-medium'>{gr.name}</p>
              <p className='text-xs text-gray-500'>
                Created by {gr.owner?.name}
              </p>
            </div>
          </div>
        </div>
      ))}
    </>
  )
}
