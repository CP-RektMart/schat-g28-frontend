'use client'

import { useCallback, useState } from 'react'

import { addFriend } from '@/actions/friend/add-friend'
import { logout } from '@/actions/me/logout'
import { MAX_FILES, MAX_FILE_SIZE } from '@/config/index'
import type { Chat } from '@/types/group'
import type { User } from '@/types/user'
import {
  Menu,
  MessageSquareMore,
  Search,
  UserPlus,
  Users,
  X,
} from 'lucide-react'
import { signOut } from 'next-auth/react'
import Image from 'next/image'
import { useDropzone } from 'react-dropzone'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
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
import { ScrollArea } from '@/components/ui/scroll-area'
import { Textarea } from '@/components/ui/textarea'

import { AddFriendDialog } from '../friend/friend-add'
import { UserProfile } from '../user/user-profile'
import { ChatFriendList } from './chat-friendlist'

interface ChatSidebarProps {
  friends: User[]
  chats: Chat[]
  selectedChat: Chat | null
  onSelectChat: (chat: Chat) => void
  onCreateGroup: (name: string, participants: User[]) => void
  onJoinGroup: (groupId: string) => void
  currentUser: User
  isMobileMenuOpen: boolean
  setIsMobileMenuOpen: (open: boolean) => void
}

export type PhotoCardForm = {
  image: File
}
export default function ChatSidebar({
  friends,
  chats,
  selectedChat,
  onSelectChat,
  onCreateGroup,
  onJoinGroup,
  currentUser,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}: ChatSidebarProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [initialMessage, setInitialMessage] = useState('')
  const [newGroupName, setNewGroupName] = useState('')
  const [newFriend, setNewFriend] = useState('')
  const [groupIdToJoin, setGroupIdToJoin] = useState('')
  const [selectedNewPartner, setSelectNewPartner] = useState<User>({})
  const [selectedUsers, setSelectedUsers] = useState<User[]>([])
  const [photoCards, setPhotoCards] = useState<PhotoCardForm>()

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
    if (newGroupName.trim() && selectedUsers.length > 0) {
      onCreateGroup(newGroupName, selectedUsers)
      setNewGroupName('')
      setSelectedUsers([])
    }
  }

  const handleJoinGroup = () => {
    if (groupIdToJoin.trim()) {
      onJoinGroup(groupIdToJoin)
      setGroupIdToJoin('')
    }
  }

  const handleAddFriend = async () => {
    if (newFriend.trim()) {
      const payload = {
        userId: parseInt(newFriend),
      }

      await addFriend(payload)
      setNewFriend('')
    }
  }

  const togglePartnerSelection = (user: User) => {
    if (selectedNewPartner.id === user.id) {
      setSelectNewPartner({} as User)
    } else {
      setSelectNewPartner(user)
    }
  }

  const toggleUserSelection = (user: User) => {
    if (selectedUsers.some((u) => u.id === user.id)) {
      setSelectedUsers(selectedUsers.filter((u) => u.id !== user.id))
    } else {
      setSelectedUsers([...selectedUsers, user])
    }
  }

  const filteredChats = chats.filter((chat) =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

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

  return (
    <>
      {/* Mobile menu button */}
      <button
        className='fixed left-4 top-4 z-50 rounded-md bg-gray-100 p-2 md:hidden'
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? (
          <X className='h-6 w-6' />
        ) : (
          <Menu className='h-6 w-6' />
        )}
      </button>

      {/* Sidebar */}
      <div
        className={`${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } md: fixed inset-y-0 left-0 z-40 w-full max-w-[340px] transform bg-white shadow-lg transition-transform duration-300 ease-in-out md:relative md:translate-x-0 lg:max-w-96`}
      >
        <div className='flex h-full flex-col'>
          {/* User profile */}
          <UserProfile currentUser={currentUser} handleLogout={handleLogout} />
          {/* Search and actions */}
          <div className='border-b p-4'>
            <div className='relative mb-4'>
              <Search className='absolute left-3 top-2.5 h-4 w-4 text-gray-400' />
              <Input
                placeholder='Search Chat'
                className='pl-9'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            {/* Start a new direct conversation or group chat */}
            <div className='flex flex-col space-y-2'>
              {/* direct msg chat */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button className='flex-1'>
                    <MessageSquareMore className='mr-2 h-4 w-4' />
                    Direct
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Message with new friend</DialogTitle>
                  </DialogHeader>
                  <div className='space-y-4 py-4'>
                    <div className='space-y-2'>
                      <Label>Select your friend</Label>
                      <ChatFriendList
                        friends={friends}
                        selectedNewPartner={selectedNewPartner}
                        handleSelectUsers={togglePartnerSelection}
                      />
                    </div>
                    <div className='space-y-2'>
                      <Label htmlFor='initial-message'>First Message</Label>
                      <Textarea
                        className='w-full resize-y rounded-md border p-2 text-sm'
                        id='initial-message'
                        placeholder='Enter your first message'
                        value={initialMessage}
                        onChange={(e) => setInitialMessage(e.target.value)}
                        rows={3}
                      />
                    </div>
                    <Button
                      className='w-full'
                      onClick={handleCreateGroup}
                      disabled={
                        !newGroupName.trim() || selectedUsers.length === 0
                      }
                    >
                      Send Message
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>

              {/* group chat */}
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
                            Image must be less than 10 MB and of type png, jpg,
                            or jpeg
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
                        friends={friends}
                        selectedUsers={selectedUsers}
                        handleSelectUsers={toggleUserSelection}
                      />
                    </div>
                    <Button
                      className='w-full'
                      onClick={handleCreateGroup}
                      disabled={
                        !newGroupName.trim() || selectedUsers.length === 0
                      }
                    >
                      Create Group
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>

              {/* join group */}
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
                        value={groupIdToJoin}
                        onChange={(e) => setGroupIdToJoin(e.target.value)}
                      />
                    </div>
                    <Button
                      className='w-full'
                      onClick={handleJoinGroup}
                      disabled={!groupIdToJoin.trim()}
                    >
                      Join Group
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            {/* */}
          </div>

          {/* Add friend */}
          <AddFriendDialog
            handleAddFriend={handleAddFriend}
            newFriend={newFriend}
            setNewFriend={setNewFriend}
          />

          {/* Chat list */}
          <ScrollArea className='flex-1'>
            <div className='space-y-1 p-2'>
              {filteredChats.length > 0 ? (
                filteredChats.map((chat) => (
                  <div
                    key={chat.id}
                    className={`flex cursor-pointer items-center justify-between rounded-md p-3 ${
                      selectedChat?.id === chat.id
                        ? 'bg-gray-100'
                        : 'hover:bg-gray-50'
                    }`}
                    onClick={() => onSelectChat(chat)}
                  >
                    <div className='flex items-center space-x-3'>
                      <Avatar>
                        <AvatarImage
                          src={chat.profilePictureUrl}
                          alt={chat.name}
                        />
                        <AvatarFallback>{chat.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className='flex items-center'>
                          <h3 className='font-medium'>{chat.name}</h3>
                          {chat.isGroup && (
                            <span className='ml-1 text-xs'>
                              ({chat.participants.length})
                            </span>
                          )}
                        </div>
                        <p className='line-clamp-1 text-sm text-gray-500'>
                          {chat.lastMessage}
                        </p>
                      </div>
                    </div>
                    <div className='flex flex-col items-end space-y-1'>
                      <span className='text-xs text-gray-500'>
                        {chat.timestamp}
                      </span>
                      {chat.unread > 0 && (
                        <Badge className='flex h-5 w-5 items-center justify-center rounded-full p-0'>
                          {chat.unread}
                        </Badge>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className='p-4 text-center text-gray-500'>
                  No conversations found
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
      </div>
    </>
  )
}
