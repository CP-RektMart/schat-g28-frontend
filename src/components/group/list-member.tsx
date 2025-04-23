import { cn } from '@/lib/utils'
import { User } from '@/types/user'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

export default function listMember({
  members,
  popoverOpen,
  setPopOverOpen,
  chatColor,
}: {
  members: User[]
  popoverOpen: boolean
  setPopOverOpen: (open: boolean) => void
  chatColor: string
}) {
  if (!members) {
    return <div>no member</div>
  }

  return (
    <Popover open={popoverOpen}>
      <PopoverTrigger asChild>
        <button
          className={cn(
            'ml-2 flex flex-row gap-2 rounded-sm bg-gray-300 px-2 py-1',
            chatColor
          )}
          onClick={() => setPopOverOpen(!popoverOpen)}
        >
          See members
        </button>
      </PopoverTrigger>
      <PopoverContent className='w-64 p-3'>
        <div className='space-y-2'>
          {members.map((member) => (
            <div
              key={member.id}
              className='flex items-center justify-between rounded-md p-2'
            >
              <div className='flex items-center space-x-3'>
                <Avatar className='size-8'>
                  <AvatarImage
                    src={member.profilePictureUrl}
                    alt='User Avatar'
                  />
                  <AvatarFallback>{member.name?.charAt(0)}</AvatarFallback>
                </Avatar>
                <span>{member.name}</span>
              </div>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}
