'use client'

import { useState } from 'react'

import { GroupDetail } from '@/types/group'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export interface GroupSettingsFormProps {
  group: GroupDetail
}

const schema = z.object({
  displayName: z
    .string()
    .min(1, 'Display name is required')
    .max(50, 'Display name must be at most 50 characters'),
})

export function GroupSettingsForm({ group }: GroupSettingsFormProps) {
  const [isSaving, setIsSaving] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      displayName: group.name || '',
    },
  })

  const onSubmit = async (data: { displayName: string }) => {
    setIsSaving(true)
    try {
      console.log(data)
      // Simulate API call
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
