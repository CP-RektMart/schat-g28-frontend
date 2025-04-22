'use client'

import { useCallback, useState } from 'react'

import { logout } from '@/actions/me/logout'
import { MAX_FILES, MAX_FILE_SIZE } from '@/config/index'
import type { Group } from '@/types/group'
import { ChatMode, DMMessage, GroupMessage } from '@/types/message'
import type { User } from '@/types/user'
import {
  Menu,
  MessageSquare,
  MessageSquareMore,
  MessagesSquare,
  Search,
  UserPlus,
  Users,
  X,
} from 'lucide-react'
import { signOut } from 'next-auth/react'
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
import { ScrollArea } from '@/components/ui/scroll-area'
import { Textarea } from '@/components/ui/textarea'

import { UserProfile } from '../user/user-profile'
import { AnotherChatFriendList } from './another-chat-friendlist'
import { ChatFriendList } from './chat-friendlist'
import { ChatGroupList } from './chat-grouplist'
import { CreateGroup } from './sidebar/create-group'
import { JoinGroup } from './sidebar/join-group'
import { MobileMenuButton } from './sidebar/mobile-menu-button'
import { SearchChat } from './sidebar/search-chat'
import { SelectChatMode } from './sidebar/select-chatmode'

interface ChatSidebarProps {
  users: User[]
  groups: Group[]
  chatMode: ChatMode
  setChatMode: (mode: ChatMode) => void
  groupMsgs: GroupMessage[]
  dmMsgs: DMMessage[]
  selectedUserID: number
  selectedGroupID: number
  setSelectedGroupID: (id: number) => void
  setSelectedUserID: (id: number) => void
  myProfile: User
  // chats: Chat[]
  // selectedChat: Chat | null
  // onSelectChat: (chat: Chat) => void
  onJoinGroup: (groupId: string) => void
  isMobileMenuOpen: boolean
  setIsMobileMenuOpen: (open: boolean) => void
  // selectedUser: User | null
  // handleSelectUser: (user: User) => void
  // listMode: string
  // setListMode: (mode: string) => void
  selectedColor: string
  setSelectedColor: (color: string) => void
}

export type PhotoCardForm = {
  image: File
}
export default function ChatSidebar({
  users,
  groups,
  chatMode,
  setChatMode,
  groupMsgs,
  dmMsgs,
  selectedUserID,
  selectedGroupID,
  setSelectedGroupID,
  setSelectedUserID,
  // chats,
  // selectedChat,
  // onSelectChat,
  onJoinGroup,
  myProfile,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  // selectedUser,
  // handleSelectUser,
  // listMode,
  // setListMode,
  selectedColor,
  setSelectedColor,
}: ChatSidebarProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [initialMessage, setInitialMessage] = useState('')

  const [groupIdToJoin, setGroupIdToJoin] = useState('')
  const [selectedNewPartner, setSelectNewPartner] = useState<User>({})
  const [selectedUsers, setSelectedUsers] = useState<User[]>([])

  const selectedUser = users.find((u) => u.id == selectedUserID) as User

  const handleJoinGroup = () => {
    if (groupIdToJoin.trim()) {
      onJoinGroup(groupIdToJoin)
      setGroupIdToJoin('')
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

  return (
    <>
      {/* Mobile menu button */}
      <MobileMenuButton
        isOpen={isMobileMenuOpen}
        setIsOpen={setIsMobileMenuOpen}
      />

      {/* Sidebar */}
      <div
        className={`${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } md: fixed inset-y-0 left-0 z-40 w-full max-w-[340px] transform bg-white shadow-lg transition-transform duration-300 ease-in-out md:relative md:translate-x-0 lg:max-w-96`}
      >
        <div className='flex h-full flex-col'>
          {/* User profile */}
          <UserProfile
            myProfile={myProfile}
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
          />

          {/* Search and actions */}
          <div className='border-b p-4'>
            <SearchChat
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />

            {/* Start a new direct conversation or group chat */}
            <CreateGroup users={users} />

            {/* join group */}
            <JoinGroup />

            <SelectChatMode chatMode={chatMode} setChatMode={setChatMode} />
          </div>
          {/* Chat list */}
          <ScrollArea className='flex-1'>
            <div className='space-y-1 p-3'>
              {chatMode == 'DM' && (
                <AnotherChatFriendList
                  friends={users}
                  selectedUserId={selectedUserID}
                  handleSelectUserId={setSelectedUserID}
                />
              )}
              {chatMode == 'GROUP' && (
                <ChatGroupList
                  groups={groups}
                  selectGroupId={selectedGroupID}
                  setSelectedGroupId={setSelectedGroupID}
                />
              )}
            </div>
          </ScrollArea>
        </div>
      </div>
    </>
  )
}
