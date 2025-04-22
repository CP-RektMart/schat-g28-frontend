'use client'

import { useState } from 'react'

import { updateMe } from '@/actions/me/update-me'
import { cn } from '@/lib/utils'
import { User } from '@/types/user'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

export interface UserSettingsFormProps {
  user: User
  chatColor: string
}

const schema = z.object({
  displayName: z
    .string()
    .min(1, 'Display name is required')
    .max(50, 'Display name must be at most 50 characters'),
  chatColor: z.string(),
})

const colorOptions = [
  { name: 'Gray', bgClass: 'bg-gray-500' },
  { name: 'Blue', bgClass: 'bg-blue-500' },
  { name: 'Red', bgClass: 'bg-red-500' },
  { name: 'Green', bgClass: 'bg-green-500' },
  { name: 'Purple', bgClass: 'bg-purple-500' },
  { name: 'Pink', bgClass: 'bg-pink-500' },
  { name: 'Orange', bgClass: 'bg-orange-500' },
  { name: 'Teal', bgClass: 'bg-teal-500' },
]

export function UserSettingsForm({ user, chatColor }: UserSettingsFormProps) {
  const [isSaving, setIsSaving] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      displayName: user.name || '',
      chatColor: chatColor || 'bg-blue-500',
    },
  })

  const currentColorClass = watch('chatColor')
  const selectedColor = colorOptions.find(
    (c) => c.bgClass === currentColorClass
  )

  const onSubmit = async (data: { displayName: string; chatColor: string }) => {
    setIsSaving(true)
    try {
      await updateMe({
        name: data.displayName,
        chatColor: data.chatColor,
      })
      await new Promise((resolve) => setTimeout(resolve, 1000))
      toast('Settings updated successfully')
    } catch (error) {
      toast(
        'Failed to update settings: ' +
          (error instanceof Error ? error.message : 'Unknown error')
      )
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-4 pt-4'>
      <div className='flex items-center space-x-4'>
        <Avatar className='h-16 w-16'>
          <AvatarImage src={user.profilePictureUrl} alt='User Avatar' />
          <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className='w-full space-y-2'>
          <Label htmlFor='displayName'>Display Name</Label>
          <Input
            id='displayName'
            {...register('displayName')}
            placeholder='Enter your display name'
            disabled={isSaving}
          />
          {errors.displayName && (
            <p className='text-sm text-red-500'>{errors.displayName.message}</p>
          )}
        </div>
      </div>

      <div className='mb-6'>
        <label className='mb-2 block text-lg font-medium'>Chat Color</label>
        <div className='flex items-center space-x-3'>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant='outline'
                className={cn(
                  'flex items-center space-x-2 border-2',
                  selectedColor?.bgClass
                )}
              >
                <div
                  className={cn('h-4 w-4 rounded-full', selectedColor?.bgClass)}
                />
                <span>{selectedColor?.name}</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className='w-64 px-4 py-3'>
              <h4 className='mb-2 font-medium'>Select Chat Color</h4>
              <div className='grid grid-cols-4 gap-2'>
                {colorOptions.map((color, idx) => (
                  <button
                    key={idx}
                    type='button'
                    className={cn(
                      'flex size-8 items-center justify-center rounded-full transition-all',
                      color.bgClass,
                      currentColorClass === color.bgClass
                        ? 'ring-2 ring-black ring-offset-2'
                        : 'hover:scale-110'
                    )}
                    onClick={() => setValue('chatColor', color.bgClass)}
                    title={color.name}
                  />
                ))}
              </div>
            </PopoverContent>
          </Popover>

          <div className='flex-1'>
            <div
              className={cn(
                'max-w-[200px] rounded-lg p-3 text-white',
                currentColorClass
              )}
            >
              <p className='text-sm'>Preview message</p>
            </div>
          </div>
        </div>
      </div>

      <div className='flex justify-end'>
        <Button type='submit' disabled={isSaving}>
          {isSaving ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>
    </form>
  )
}
