'use client'

import { useState } from 'react'

import type { Group } from '@/types/group'
import type { Message } from '@/types/message'
import type { User } from '@/types/user'

import ChatArea from '@/components/chat/chat-area'
import ChatSidebar from '@/components/chat/chat-sidebar'

export interface ChatPageProps {
  friends: User[]
  currentUser: User
}

export type Chat = Group | User

export default function ChatPageComponent({
  currentUser,
  friends,
}: ChatPageProps) {
  const [chats, setChats] = useState<Group[]>([])
  const [messages, setMessages] = useState<Record<string, Message[]>>({})
  const [selectedChat, setSelectedChat] = useState<Group | null>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleSelectChat = (chat: Group) => {
    setSelectedChat(chat)
    setChats(chats.map((c) => (c.id === chat.id ? { ...c, unread: 0 } : c)))
    setIsMobileMenuOpen(false)
  }

  const handleSendMessage = (text: string) => {
    console.log(text)
  }

  const handleEditMessage = (messageId: string, newText: string) => {
    if (!selectedChat) return

    setMessages({
      ...messages,
      [selectedChat.id]: (messages[selectedChat.id] || []).map((msg) =>
        msg.id === messageId ? { ...msg, text: newText, isEdited: true } : msg
      ),
    })
  }

  const handleDeleteMessage = (messageId: string) => {
    if (!selectedChat) return

    setMessages({
      ...messages,
      [selectedChat.id]:
        messages[selectedChat.id]?.filter((msg) => msg.id !== messageId) || [],
    })
  }

  const handleCreateGroup = (name: string, participants: User[]) => {
    setChats([newChat, ...chats])
    setSelectedChat(newChat)
    setMessages({
      ...messages,
      [newChat.id]: [],
    })

    console.log({ name, participants })
  }

  const handleJoinGroup = (groupId: string) => {
    // In a real app, this would verify the group exists and add the user
    alert(`Joined group with ID: ${groupId}`)
  }

  return (
    <div className='flex h-screen bg-gray-50'>
      <ChatSidebar
        friends={friends}
        chats={chats}
        selectedChat={selectedChat}
        currentUser={currentUser}
        isMobileMenuOpen={isMobileMenuOpen}
        onJoinGroup={handleJoinGroup}
        onSelectChat={handleSelectChat}
        onCreateGroup={handleCreateGroup}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />
      <ChatArea
        chat={selectedChat}
        messages={selectedChat ? messages[selectedChat.id] || [] : []}
        currentUser={currentUser}
        onSendMessage={handleSendMessage}
        onEditMessage={handleEditMessage}
        onDeleteMessage={handleDeleteMessage}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />
    </div>
  )
}
