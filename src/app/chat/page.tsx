'use client'

import { useState } from 'react'

import { initialChats } from '@/mock/initial-chat'
import type { Chat } from '@/types/chat'
import type { Message } from '@/types/message'
//TODO: change type config
import type { User } from '@/types/user'

//

import ChatArea from '@/components/chat/chat-area'
import ChatSidebar from '@/components/chat/chat-sidebar'

// Mock data
const currentUser: User = {
  id: 'user1',
  name: 'John Doe',
  email: 'john@example.com',
  profilePictureUrl: '/placeholder.svg?height=40&width=40',
}

const initialMessages: Record<string, Message[]> = {
  chat1: [
    {
      id: 'msg1',
      chatId: 'chat1',
      senderId: 'user2',
      text: 'Hey, how are you?',
      timestamp: '10:30 AM',
      isEdited: false,
    },
    {
      id: 'msg2',
      chatId: 'chat1',
      senderId: 'user1',
      text: "I'm good, thanks! How about you?",
      timestamp: '10:32 AM',
      isEdited: false,
    },
    {
      id: 'msg3',
      chatId: 'chat1',
      senderId: 'user2',
      text: 'Doing well! Are you free to discuss the project later today?',
      timestamp: '10:33 AM',
      isEdited: false,
    },
  ],
  chat2: [
    {
      id: 'msg4',
      chatId: 'chat2',
      senderId: 'user3',
      text: 'Meeting at 2 PM today, everyone',
      timestamp: '9:00 AM',
      isEdited: false,
    },
    {
      id: 'msg5',
      chatId: 'chat2',
      senderId: 'user4',
      text: "I'll be there!",
      timestamp: '9:05 AM',
      isEdited: false,
    },
    {
      id: 'msg6',
      chatId: 'chat2',
      senderId: 'user1',
      text: 'See you all then',
      timestamp: '9:10 AM',
      isEdited: false,
    },
  ],
}

export default function ChatPage() {
  const [chats, setChats] = useState<Chat[]>(initialChats)
  const [messages, setMessages] =
    useState<Record<string, Message[]>>(initialMessages)
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
        onSelectChat={handleSelectChat}
        onCreateGroup={handleCreateGroup}
        onJoinGroup={handleJoinGroup}
        currentUser={currentUser}
        isMobileMenuOpen={isMobileMenuOpen}
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
