'use client'

import { useEffect, useState } from 'react'

import { createGroup } from '@/actions/group/create-group'
import {
  getDirectMessageHistory,
  getGroupMessageHistory,
} from '@/actions/history/get-history'
import useMessage from '@/hooks/useMessage'
import type { Group } from '@/types/group'
import type { DMMessage, GroupMessage, Message } from '@/types/message'
import type { User } from '@/types/user'

import ChatArea from '@/components/chat/chat-area'
import ChatSidebar from '@/components/chat/chat-sidebar'

export interface ChatPageProps {
  friends: User[]
  groups: Group[]
  currentUser: User
  accessToken: string
}

export type Chat = Group | User

export default function ChatPageComponent({
  currentUser,
  friends,
  groups,
  accessToken,
}: ChatPageProps) {
  const [chats, setChats] = useState<Group[]>([])
  const [messages, setMessages] = useState<Record<string, Message[]>>(undefined)
  const [selectedChat, setSelectedChat] = useState<Group | null>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [selectedTalker, setSelectedTalker] = useState<User | Group>(null)
  const [listMode, setListMode] = useState<'friends' | 'groups' | undefined>(
    undefined
  )

  useEffect(() => {
    if (!selectedTalker || !selectedTalker.id) return
    ;(async () => {
      let data

      if (listMode === 'friends') {
        data = await getDirectMessageHistory(selectedTalker.id)
      } else if (listMode === 'groups') {
        data = await getGroupMessageHistory(selectedTalker.id)
      }

      setSelectedChat(data)
      setMessages(data.messages)
    })()
  }, [selectedTalker?.id])

  const handleSelectTalker = (talker: User | Group) => {
    setSelectedTalker(talker)
  }

  const { sendDMMessage } = useMessage({
    getDMMessage,
    getGroupMessage,
    accessToken,
  })

  function getDMMessage(msg: DMMessage) {
    console.log(msg)
  }

  function getGroupMessage(msg: GroupMessage) {
    console.log(msg)
  }

  const handleSelectChat = (chat: Group) => {
    setSelectedChat(chat)
    setChats(chats.map((c) => (c.id === chat.id ? { ...c, unread: 0 } : c)))
    setIsMobileMenuOpen(false)
  }

  const handleCreateGroup = async (
    groupCover: File,
    name: string,
    participants: User[]
  ) => {
    console.log({ groupCover, name, participants })
    if (!groupCover || !name || participants.length === 0) {
      alert('Please fill in all fields')
      return
    }

    const memberIdRecord = participants.map((user) => Number(user.id))

    const payload = {
      name: name,
      memberIds: memberIdRecord,
      groupPicture: groupCover,
    }
    try {
      await createGroup(payload)
    } catch (err) {
      console.error('Failed to create group:', err)
    }
  }

  const handleJoinGroup = (groupId: string) => {
    // In a real app, this would verify the group exists and add the user
    alert(`Joined group with ID: ${groupId}`)
  }

  const handleUpdateMessages = (newMessage: Message) => {
    setMessages((prevMessages) => {
      console.log('prevMessages', prevMessages)
      console.log('newMessage', newMessage)

      return [...prevMessages, newMessage]
    })
  }

  return (
    <div className='flex h-screen bg-gray-50'>
      <ChatSidebar
        friends={friends}
        groups={groups}
        chats={chats}
        selectedChat={selectedChat}
        currentUser={currentUser}
        isMobileMenuOpen={isMobileMenuOpen}
        onJoinGroup={handleJoinGroup}
        onSelectChat={handleSelectChat}
        onCreateGroup={handleCreateGroup}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        selectedUser={selectedTalker}
        handleSelectUser={handleSelectTalker}
        listMode={listMode}
        setListMode={setListMode}
      />
      <ChatArea
        chat={selectedChat}
        messages={messages}
        onUpdateMessages={handleUpdateMessages}
        currentUser={currentUser}
        onSendMessage={sendDMMessage}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        listMode={listMode}
      />
      {/* {JSON.stringify(groups)} */}
    </div>
  )
}
