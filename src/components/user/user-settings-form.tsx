'use client'

import { useState } from 'react'

import { UserProfile } from '@/types/user'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export interface UserSettingsFormProps {
  user: UserProfile
}

const schema = z.object({
  displayName: z
    .string()
    .min(1, 'Display name is required')
    .max(50, 'Display name must be at most 50 characters'),
})

export function UserSettingsForm({ user }: UserSettingsFormProps) {
  const [isSaving, setIsSaving] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      displayName: user.name || '',
    },
  })

  const onSubmit = async (data: { displayName: string }) => {
    setIsSaving(true)
    try {
      // Simulate API call
      console.log(data)
      await new Promise((resolve) => setTimeout(resolve, 1000))
      toast('Settings updated successfully')
    } catch (error) {
      toast(
        'Failed to update settings:' +
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
          <AvatarFallback>{user.name.slice(0, 1)}</AvatarFallback>
        </Avatar>
        <div className='space-y-4'>
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
      <div className='flex justify-end'>
        <Button type='submit' disabled={isSaving}>
          {isSaving ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>
    </form>
  )
}
