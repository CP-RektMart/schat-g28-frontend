import { useState } from 'react'

import { logout } from '@/actions/me/logout'
import { updateMe } from '@/actions/me/update-me'
// import { colorOptions } from '@/color'
import { cn } from '@/lib/utils'
import type { User } from '@/types/user'
import { LogOut } from 'lucide-react'
import { signOut } from 'next-auth/react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { UserSettings } from '@/components/user/user-settings'

export interface UserProfileProps {
  myProfile: User
  selectedColor: string
  setSelectedColor: (color: string) => void
}
const colorOptions = [
  'bg-gray-500',
  'bg-amber-700	',
  'bg-emerald-900',
  'bg-cyan-700',
  'bg-sky-500',
  'bg-pink-800',
  'bg-yellow-700',
  'bg-orange-600',
]

export function UserProfile({
  myProfile,
  selectedColor,
  setSelectedColor,
}: UserProfileProps) {
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

  const [popoverOpen, setPopoverOpen] = useState(false)

  const handleChangeColor = async (color: string) => {
    setSelectedColor(color)
    setPopoverOpen(false)
    try {
      console.log('Updating color:', color)
      await updateMe({ color: color })
      console.log('Color updated successfully:', color)
    } catch (error) {
      console.error('Error updating color:', error)
    }
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
        <div className='flex items-center space-x-1'>
          <Popover open={popoverOpen}>
            <PopoverTrigger asChild>
              <button
                className={cn(
                  'size-8 rounded-full hover:ring-2 hover:ring-black hover:ring-offset-2',
                  selectedColor
                )}
                onClick={() => setPopoverOpen((prev) => !prev)}
              />
            </PopoverTrigger>
            <PopoverContent className='w-64 p-3'>
              <div className='space-y-2'>
                <h4 className='mb-2 font-medium'>Select Chat Color</h4>
                <div className='grid grid-cols-4 gap-2'>
                  {colorOptions.map((color) => (
                    <button
                      key={color}
                      className={cn(
                        'flex h-12 w-12 items-center justify-center rounded-full hover:ring-2 hover:ring-black hover:ring-offset-2',
                        color
                      )}
                      onClick={() => handleChangeColor(color)}
                    />
                  ))}
                </div>
                <p className='mt-2 text-sm text-gray-500'>
                  This color will be used for your chat bubbles.
                </p>
              </div>
            </PopoverContent>
          </Popover>
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
    </div>
  )
}
