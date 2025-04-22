'use client'

import { GroupDetail } from '@/types/group'
import { Ellipsis } from 'lucide-react'

import { GroupSettingsForm } from '@/components/group/group-settings-form'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

import { Button } from '../ui/button'

export interface GroupSettingsProps {
  group: GroupDetail
}

export function GroupSettings({ group }: GroupSettingsProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='ghost'>
          <Ellipsis className='h-4 w-4' />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Group Settings</DialogTitle>
          <GroupSettingsForm group={group} />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
