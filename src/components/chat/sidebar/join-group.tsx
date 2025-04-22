import { useState } from 'react'

import { joinGroup } from '@/actions/group/join-group'
import { UserPlus } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function JoinGroup() {
  const [field, setField] = useState('')

  function handleJoinGroup() {
    ;(async () => {
      const resp = await joinGroup(Number(field))
      if (resp?.error) {
        toast.error(resp.error)
      }
    })()
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='outline' className='flex-1 bg-slate-200'>
          <UserPlus className='mr-2 h-4 w-4' />
          Join Group
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Join a Group</DialogTitle>
        </DialogHeader>
        <div className='space-y-4 py-4'>
          <div className='space-y-2'>
            <Label htmlFor='group-id'>Group ID</Label>
            <Input
              id='group-id'
              placeholder='Enter group ID'
              value={field}
              onChange={(e) => setField(e.target.value)}
            />
          </div>
          <Button
            className='w-full'
            onClick={handleJoinGroup}
            disabled={!field.trim()}
          >
            Join Group
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
