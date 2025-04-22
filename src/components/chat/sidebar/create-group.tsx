import { useCallback, useState } from 'react'

import { createGroup } from '@/actions/group/create-group'
import { MAX_FILES, MAX_FILE_SIZE } from '@/config/index'
import { User } from '@/types/user'
import { UserPlus, Users } from 'lucide-react'
import Image from 'next/image'
import { useDropzone } from 'react-dropzone'

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

import { ChatFriendList } from '../chat-friendlist'
import { PhotoCardForm } from '../chat-sidebar'

interface props {
  users: User[]
}

export function CreateGroup({ users }: props) {
  const [photoCards, setPhotoCards] = useState<PhotoCardForm>()
  const [newGroupName, setNewGroupName] = useState('')
  const [selectedUsers, setSelectedUsers] = useState<number[]>([])
  const [selectUserId, setSelectUserId] = useState<number>(-1)

  const onCreateGroup = async (
    groupCover: File,
    name: string,
    memberIds: number[]
  ) => {
    if (!groupCover || !name || memberIds.length === 0) {
      alert('Please fill in all fields')
      return
    }

    const payload = {
      name: name,
      memberIds: memberIds,
      groupPicture: groupCover,
    }
    try {
      await createGroup(payload)
    } catch (err) {
      console.error('Failed to create group:', err)
    }
  }

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles[0]) {
      const file = { image: acceptedFiles[0] }
      setPhotoCards(file)
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive, fileRejections } =
    useDropzone({
      onDrop,
      maxFiles: MAX_FILES,
      maxSize: MAX_FILE_SIZE,
      accept: { 'image/png': [], 'image/jpg': [], 'image/jpeg': [] },
    })

  const handleCreateGroup = () => {
    if (newGroupName.trim() && selectedUsers.length > 0 && photoCards) {
      onCreateGroup(photoCards.image, newGroupName, selectedUsers)
      setNewGroupName('')
      setSelectedUsers([])
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className='flex-1' variant='primary'>
          <Users className='mr-2 h-4 w-4' />
          New Group
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a New Group</DialogTitle>
        </DialogHeader>
        <div className='space-y-4 py-4'>
          <div className='space-y-2'>
            <div>
              <div>
                {photoCards && (
                  <div className='mt-2 flex items-center justify-center space-x-4 pb-4'>
                    <div className='h-32 w-32 overflow-hidden rounded-full object-cover'>
                      <Image
                        src={URL.createObjectURL(photoCards.image)}
                        alt='Uploaded preview'
                        width={256}
                        height={256}
                      />
                    </div>
                  </div>
                )}
              </div>
              <div
                {...getRootProps()}
                className='flex max-h-10 cursor-pointer flex-row items-center justify-center gap-x-2 rounded-lg bg-zinc-50 py-2'
              >
                <Input {...getInputProps()} type='file' />
                {isDragActive ? (
                  <p className='text-sm'>Drop the image!</p>
                ) : (
                  <p className='text-sm'>Upload Photos</p>
                )}
              </div>
              {fileRejections.length !== 0 && (
                <p>
                  Image must be less than 10 MB and of type png, jpg, or jpeg
                </p>
              )}
            </div>
            <Label htmlFor='group-name'>Group Name</Label>
            <Input
              id='group-name'
              placeholder='Enter group name'
              value={newGroupName}
              onChange={(e) => setNewGroupName(e.target.value)}
            />
          </div>
          <div className='space-y-2'>
            <Label>Select your friends</Label>
            <ChatFriendList
              friends={users}
              selectedUserId={selectUserId}
              handleSelectUserId={(id) => {
                setSelectUserId(id)
              }}
            />
          </div>
          <div className='w-full'>
            <Button
              className='w-full'
              onClick={handleCreateGroup}
              disabled={!newGroupName.trim() || selectedUsers.length === 0}
            >
              Create Group
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
