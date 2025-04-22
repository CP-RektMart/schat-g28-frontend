'use client'

import { User } from '@/types/user'
import { Settings } from 'lucide-react'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { UserSettingsForm } from '@/components/user/user-settings-form'

import { Button } from '../ui/button'

export interface UserSettingsProps {
  user: User
}

export function UserSettings({ user }: UserSettingsProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='ghost'>
          <Settings className='h-4 w-4' />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>User Settings</DialogTitle>
          <UserSettingsForm user={user} chatColor='Gray' />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
