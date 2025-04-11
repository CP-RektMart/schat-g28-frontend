'use client'

import type React from 'react'
import { useEffect, useRef, useState } from 'react'

import type { Chat } from '@/types/chat'
import type { Message } from '@/types/message'
//TODO: change type config
import type { UserProfile as User } from '@/types/user'
import { Edit, Menu, MoreVertical, Send, Trash2 } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'

import { ChatSettings } from './chat-settings'

//

interface ChatAreaProps {
  chat: Chat | null
  messages: Message[]
  currentUser: User
  onSendMessage: (text: string) => void
  onEditMessage: (messageId: string, newText: string) => void
  onDeleteMessage: (messageId: string) => void
  setIsMobileMenuOpen: (open: boolean) => void
}

export default function ChatArea({
  chat,
  messages,
  currentUser,
  onSendMessage,
  onEditMessage,
  onDeleteMessage,
  setIsMobileMenuOpen,
}: ChatAreaProps) {
  const [messageText, setMessageText] = useState('')
  const [editingMessageId, setEditingMessageId] = useState<string | null>(null)
  const [editText, setEditText] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (messageText.trim()) {
      onSendMessage(messageText)
      setMessageText('')
    }
  }

  const startEditMessage = (message: Message) => {
    setEditingMessageId(message.id)
    setEditText(message.text)
  }

  const saveEditMessage = () => {
    if (editingMessageId && editText.trim()) {
      onEditMessage(editingMessageId, editText)
      setEditingMessageId(null)
      setEditText('')
    }
  }

  const cancelEditMessage = () => {
    setEditingMessageId(null)
    setEditText('')
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      if (editingMessageId) {
        saveEditMessage()
      } else {
        handleSendMessage(e)
      }
    } else if (e.key === 'Escape' && editingMessageId) {
      cancelEditMessage()
    }
  }

  if (!chat) {
    return (
      <div className='flex flex-1 flex-col items-center justify-center bg-gray-50 p-4'>
        <div className='text-center'>
          <h2 className='mb-2 text-xl font-semibold text-gray-700'>
            Select a conversation
          </h2>
          <p className='text-gray-500'>
            Choose a chat from the sidebar to start messaging
          </p>
          <Button
            className='mt-4 md:hidden'
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className='mr-2 h-4 w-4' />
            Open Chats
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className='flex flex-1 flex-col bg-white'>
      {/* Chat header */}
      <div className='flex items-center justify-between border-b p-4'>
        <div className='flex items-center space-x-3'>
          <Button
            variant='ghost'
            size='icon'
            className='md:hidden'
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className='h-5 w-5' />
          </Button>
          <Avatar>
            <AvatarImage src={chat.profilePictureUrl} alt={chat.name} />
            <AvatarFallback>{chat.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <div className='flex items-center'>
              <h3 className='font-medium'>{chat.name}</h3>
              {chat.isGroup && (
                <Badge variant='outline' className='ml-2 bg-gray-100 text-xs'>
                  Group • {chat.participants.length} members
                </Badge>
              )}
            </div>
            <p className='text-xs text-gray-500'>
              {chat.isGroup
                ? `${chat.participants.length} participants`
                : 'Online'}
            </p>
          </div>
        </div>
        {chat.isGroup && <ChatSettings chat={chat} />}
      </div>

      {/* Messages area */}
      <ScrollArea className='flex-1 p-4'>
        <div className='space-y-4'>
          {messages.length > 0 ? (
            messages.map((message) => {
              const isCurrentUser = message.senderId === currentUser.id
              const sender = chat.participants.find(
                (p) => p.id === message.senderId
              )

              return (
                <div
                  key={message.id}
                  className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[70%] ${
                      isCurrentUser
                        ? 'rounded-l-lg rounded-tr-lg bg-gray-900 text-white'
                        : 'rounded-r-lg rounded-tl-lg bg-gray-100 text-gray-900'
                    } overflow-hidden`}
                  >
                    {!isCurrentUser && chat.isGroup && (
                      <div className='border-b border-gray-200 px-4 py-2 text-xs font-medium'>
                        {sender?.name || 'Unknown user'}
                      </div>
                    )}

                    <div className='p-4'>
                      {editingMessageId === message.id ? (
                        <div className='space-y-2'>
                          <Input
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                            onKeyDown={handleKeyDown}
                            autoFocus
                            className='bg-white text-gray-900'
                          />
                          <div className='flex justify-end space-x-2'>
                            <Button
                              size='sm'
                              variant='ghost'
                              onClick={cancelEditMessage}
                            >
                              Cancel
                            </Button>
                            <Button size='sm' onClick={saveEditMessage}>
                              Save
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <p className='whitespace-pre-wrap break-words'>
                            {message.text}
                          </p>
                          <div
                            className={`mt-1 flex items-center justify-between text-xs ${
                              isCurrentUser ? 'text-gray-300' : 'text-gray-500'
                            }`}
                          >
                            <span>{message.timestamp}</span>
                            {message.isEdited && <span>(edited)</span>}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {isCurrentUser && !editingMessageId && (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant='ghost'
                          size='icon'
                          className='h-8 w-8 shrink-0'
                        >
                          <MoreVertical className='h-4 w-4' />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align='end'>
                        <DropdownMenuItem
                          onClick={() => startEditMessage(message)}
                        >
                          <Edit className='mr-2 h-4 w-4' />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => onDeleteMessage(message.id)}
                          className='text-red-500'
                        >
                          <Trash2 className='mr-2 h-4 w-4' />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </div>
              )
            })
          ) : (
            <div className='py-8 text-center text-gray-500'>
              No messages yet. Start the conversation!
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Message input */}
      <div className='border-t p-4'>
        <form onSubmit={handleSendMessage} className='flex space-x-2'>
          <Input
            placeholder='Type a message...'
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            onKeyDown={handleKeyDown}
            className='flex-1'
          />
          <Button type='submit' disabled={!messageText.trim()}>
            <Send className='h-4 w-4' />
          </Button>
        </form>
      </div>
    </div>
  )
}
