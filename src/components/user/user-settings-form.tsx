'use client'

import { useState } from 'react'
import { useRef } from 'react'

import { updateMe } from '@/actions/me/update-me'
import { updateProfilePicture } from '@/actions/me/update-profile-pic'
import { User } from '@/types/user'
import { zodResolver } from '@hookform/resolvers/zod'
import { Pen } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export interface UserSettingsFormProps {
  user: User
}

const schema = z.object({
  displayName: z
    .string()
    .min(1, 'Display name is required')
    .max(50, 'Display name must be at most 50 characters'),
})

export function UserSettingsForm({ user }: UserSettingsFormProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [isSaving, setIsSaving] = useState(false)

  const handleAvatarClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (file.size > 2 * 1024 * 1024) {
      toast.error('Profile picture must not exceed 2MB')
      return
    }

    const extension = file.name.split('.').pop()
    const safeName = `profile-${Date.now()}.${extension}`
    const renamedFile = new File([file], safeName, { type: file.type })

    setIsSaving(true)
    try {
      await updateProfilePicture(renamedFile)
      toast.success('Profile picture updated successfully!')
    } catch (error) {
      const message =
        error instanceof Error && error.message.includes('Body exceeded 1 MB')
          ? 'Upload failed: Image exceeds 1MB limit'
          : 'Failed to update profile picture'

      toast.error(message)
    } finally {
      setIsSaving(false)
    }
  }

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
      const payload = {
        name: data.displayName,
      }

      await updateMe(payload)
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
        <div className='relative'>
          <Avatar className='h-16 w-16'>
            <AvatarImage src={user.profilePictureUrl} alt='User Avatar' />
            <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
          </Avatar>
          <Button
            type='button'
            variant='ghost'
            size='icon'
            className='absolute bottom-0 right-0 h-6 w-6 rounded-full bg-white p-1 shadow'
            onClick={handleAvatarClick}
          >
            <Pen className='h-4 w-4' />
          </Button>
          <Input
            ref={fileInputRef}
            type='file'
            accept='image/*'
            className='hidden'
            onChange={handleFileChange}
          />
        </div>

        <div className='w-full space-y-2'>
          <Label htmlFor='displayName'>Display Name</Label>
          <Input
            id='displayName'
            {...register('displayName')}
            placeholder='Enter your display name'
            disabled={isSaving}
            className='w-full'
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
