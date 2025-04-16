'use client'

import { useState } from 'react'

import type { Chat } from '@/types/chat'
import type { Message } from '@/types/message'
import type { User } from '@/types/user'

import ChatArea from '@/components/chat/chat-area'
import ChatSidebar from '@/components/chat/chat-sidebar'

export interface ChatPageProps {
  currentUser: User
}

export default function ChatPageComponent({ currentUser }: ChatPageProps) {
  const [chats, setChats] = useState<Chat[]>([])
  const [messages, setMessages] = useState<Record<string, Message[]>>({})
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleSelectChat = (chat: Chat) => {
    setSelectedChat(chat)
    // Mark messages as read
    setChats(chats.map((c) => (c.id === chat.id ? { ...c, unread: 0 } : c)))
    setIsMobileMenuOpen(false)
  }

  const handleSendMessage = (text: string) => {
    if (!selectedChat || !text.trim()) return

    const newMessage: Message = {
      id: `msg${Date.now()}`,
      chatId: selectedChat.id,
      senderId: currentUser.id,
      text,
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
      isEdited: false,
    }

    // Update messages
    setMessages({
      ...messages,
      [selectedChat.id]: [...(messages[selectedChat.id] || []), newMessage],
    })

    // Update chat preview
    setChats(
      chats.map((chat) =>
        chat.id === selectedChat.id
          ? {
              ...chat,
              lastMessage: text,
              timestamp: 'Just now',
            }
          : chat
      )
    )
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
    const newChat: Chat = {
      id: `chat${Date.now()}`,
      name,
      isGroup: true,
      lastMessage: 'Group created',
      timestamp: 'Just now',
      profilePictureUrl: '/placeholder.svg?height=40&width=40',
      unread: 0,
      participants: [currentUser, ...participants],
    }

    setChats([newChat, ...chats])
    setSelectedChat(newChat)
    setMessages({
      ...messages,
      [newChat.id]: [],
    })
  }

  const handleJoinGroup = (groupId: string) => {
    // In a real app, this would verify the group exists and add the user
    alert(`Joined group with ID: ${groupId}`)
  }

  return (
    <div className='flex h-screen bg-gray-50'>
      <ChatSidebar
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
