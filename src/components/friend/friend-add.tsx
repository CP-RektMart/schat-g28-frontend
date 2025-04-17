import { UserCheck } from 'lucide-react'

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

export interface AddFriendDialogProps {
  handleAddFriend: () => void
  newFriend: string
  setNewFriend: (friendId: string) => void
}

export function AddFriendDialog({
  handleAddFriend,
  newFriend,
  setNewFriend,
}: AddFriendDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={'outline'} className='flex-1'>
          <UserCheck className='mr-2 h-4 w-4' />
          Add Friends
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add friends</DialogTitle>
        </DialogHeader>
        <div className='space-y-4 py-4'>
          <div className='space-y-2'>
            <Label htmlFor='group-id'>Friend ID</Label>
            <Input
              id='friend-id'
              placeholder='Enter Friend ID'
              value={newFriend}
              onChange={(e) => setNewFriend(e.target.value)}
            />
          </div>
          <Button
            className='w-full'
            onClick={() => handleAddFriend()}
            disabled={!newFriend.trim()}
          >
            Add
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
