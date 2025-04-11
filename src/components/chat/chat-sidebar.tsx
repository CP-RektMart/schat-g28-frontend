'use client'

import { useState } from 'react'

import { mockUsers } from '@/mock/mock-users'
//TODO: Type of data
import type { Chat } from '@/types/chat'
import type { User } from '@/types/user'
//
import {
  LogOut,
  Menu,
  MessageSquareMore,
  Search,
  UserPlus,
  Users,
  X,
} from 'lucide-react'
import { useRouter } from 'next/navigation'

import { UserSettings } from '@/components//user/user-settings'
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

interface ChatSidebarProps {
  chats: Chat[]
  selectedChat: Chat | null
  onSelectChat: (chat: Chat) => void
  onCreateGroup: (name: string, participants: User[]) => void
  onJoinGroup: (groupId: string) => void
  currentUser: User
  isMobileMenuOpen: boolean
  setIsMobileMenuOpen: (open: boolean) => void
}

export default function ChatSidebar({
  chats,
  selectedChat,
  onSelectChat,
  onCreateGroup,
  onJoinGroup,
  currentUser,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}: ChatSidebarProps) {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [newPartner, setNewPartner] = useState('')
  const [initialMessage, setInitialMessage] = useState('')
  const [newGroupName, setNewGroupName] = useState('')
  const [groupIdToJoin, setGroupIdToJoin] = useState('')

  const [selectedUsers, setSelectedUsers] = useState<User[]>([])

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

  const handleLogout = () => {
    router.push('/')
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
        } fixed inset-y-0 left-0 z-40 w-80 transform bg-white shadow-lg transition-transform duration-300 ease-in-out md:relative md:translate-x-0`}
      >
        <div className='flex h-full flex-col'>
          {/* User profile */}
          <div className='flex items-center justify-between border-b p-4'>
            <div className='flex items-center space-x-3'>
              <Avatar>
                <AvatarImage
                  src={currentUser.profilePictureUrl}
                  alt={currentUser.name}
                />
                <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className='font-medium'>{currentUser.name}</h3>
                <p className='text-xs text-gray-500'>{currentUser.email}</p>
              </div>
            </div>
            <div>
              <UserSettings user={currentUser} />
              <Button
                variant='ghost'
                size='icon'
                onClick={handleLogout}
                title='Logout'
              >
                <LogOut className='h-5 w-5' />
              </Button>
            </div>
          </div>

          {/* Search and actions */}
          <div className='border-b p-4'>
            <div className='relative mb-4'>
              <Search className='absolute left-3 top-2.5 h-4 w-4 text-gray-400' />
              <Input
                placeholder='Search conversations...'
                className='pl-9'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            {/* Start a new direct conversation or group chat */}
            <div className='flex flex-col space-y-2'>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className='flex-1'>
                    <MessageSquareMore className='mr-2 h-4 w-4' />
                    Direct
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Message with new partner</DialogTitle>
                  </DialogHeader>
                  <div className='space-y-4 py-4'>
                    <div className='space-y-2'>
                      <Label>Select Participants</Label>
                      <div className='max-h-60 space-y-2 overflow-y-auto rounded-md border p-2'>
                        {mockUsers.map((user) => (
                          <div
                            key={user.id}
                            className={`flex cursor-pointer items-center justify-between rounded-md p-2 ${
                              selectedUsers.some((u) => u.id === user.id)
                                ? 'bg-gray-100'
                                : ''
                            }`}
                            onClick={() => toggleUserSelection(user)}
                          >
                            <div className='flex items-center space-x-3'>
                              <Avatar className='h-8 w-8'>
                                <AvatarImage
                                  src={user.profilePictureUrl}
                                  alt={user.name}
                                />
                                <AvatarFallback>
                                  {user.name.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className='text-sm font-medium'>
                                  {user.name}
                                </p>
                                <p className='text-xs text-gray-500'>
                                  {user.email}
                                </p>
                              </div>
                            </div>
                            {selectedUsers.some((u) => u.id === user.id) && (
                              <div className='h-4 w-4 rounded-full bg-gray-900'></div>
                            )}
                          </div>
                        ))}
                      </div>
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
                      <Label htmlFor='group-name'>Group Name</Label>
                      <Input
                        id='group-name'
                        placeholder='Enter group name'
                        value={newGroupName}
                        onChange={(e) => setNewGroupName(e.target.value)}
                      />
                    </div>
                    <div className='space-y-2'>
                      <Label>Select Participants</Label>
                      <div className='max-h-60 space-y-2 overflow-y-auto rounded-md border p-2'>
                        {mockUsers.map((user) => (
                          <div
                            key={user.id}
                            className={`flex cursor-pointer items-center justify-between rounded-md p-2 ${
                              selectedUsers.some((u) => u.id === user.id)
                                ? 'bg-gray-100'
                                : ''
                            }`}
                            onClick={() => toggleUserSelection(user)}
                          >
                            <div className='flex items-center space-x-3'>
                              <Avatar className='h-8 w-8'>
                                <AvatarImage
                                  src={user.profilePictureUrl}
                                  alt={user.name}
                                />
                                <AvatarFallback>
                                  {user.name.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className='text-sm font-medium'>
                                  {user.name}
                                </p>
                                <p className='text-xs text-gray-500'>
                                  {user.email}
                                </p>
                              </div>
                            </div>
                            {selectedUsers.some((u) => u.id === user.id) && (
                              <div className='h-4 w-4 rounded-full bg-gray-900'></div>
                            )}
                          </div>
                        ))}
                      </div>
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

              <Dialog>
                <DialogTrigger asChild>
                  <Button variant='outline' className='flex-1'>
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
                            <Badge
                              variant='outline'
                              className='ml-2 bg-gray-100 text-xs'
                            >
                              G
                            </Badge>
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
