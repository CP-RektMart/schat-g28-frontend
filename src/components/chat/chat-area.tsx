'use client'

import type React from 'react'
import { useEffect, useRef, useState } from 'react'

import { cn } from '@/lib/utils'
import type { Chat } from '@/types/chat'
import type { Message } from '@/types/message'
//TODO: change type config
import type { User } from '@/types/user'
import { Menu, Send } from 'lucide-react'

import { GroupSettings } from '@/components/group/group-settings'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'

interface ChatAreaProps {
  chat: Chat | null
  messages: Message[]
  currentUser: User
  onSendMessage: (text: string) => void
  onUpdateMessages: (newMessages: Message) => void
  setIsMobileMenuOpen: (open: boolean) => void
  listMode?: 'friends' | 'groups' | undefined
}

export default function ChatArea({
  chat,
  messages,
  currentUser,
  onSendMessage,
  onUpdateMessages,
  setIsMobileMenuOpen,
  listMode,
}: ChatAreaProps) {
  const [messageText, setMessageText] = useState('')
  // const [editingMessageId, setEditingMessageId] = useState<string | null>(null)
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
      const message = {
        content: messageText,
        senderId: currentUser.id,
        receiverId: chat.id,
      }

      onSendMessage(message)
      onUpdateMessages(message)
      setMessageText('')
    }
  }

  // const cancelEditMessage = () => {
  //   setEditingMessageId(null)
  // }

  // const handleKeyDown = (e: React.KeyboardEvent) => {
  //   if (e.key === 'Enter' && !e.shiftKey) {
  //     e.preventDefault()
  //     if (editingMessageId) {
  //       // saveEditMessage()
  //     } else {
  //       handleSendMessage(e)
  //     }
  //   } else if (e.key === 'Escape' && editingMessageId) {
  //     cancelEditMessage()
  //   }
  // }

  if (!messages) {
    return (
      <div className='flex flex-1 flex-col items-center justify-center bg-gray-50 p-4'>
        <div className='text-center'>
          <h2 className='mb-2 text-xl font-semibold text-gray-700'>
            Select a conversation
          </h2>
          <p className='text-gray-500'>
            Choose a chat from the sidebar to start messaging
          </p>
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
            <AvatarImage src={chat.profilePictureURL} alt='profile picture' />
            <AvatarFallback>{chat.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <div className='flex items-center'>
              <h3 className='font-medium'>{chat.name}</h3>
              {'participants' in chat && (
                <Badge variant='outline' className='ml-2 bg-gray-100 text-xs'>
                  Group • {chat.participants.length} members
                </Badge>
              )}
            </div>
            {/* <p className='text-xs text-gray-500'>
              {'participants' in chat
                ? `${chat.participants.length} participants`
                : 'Online'}
            </p> */}
          </div>
        </div>
        {'participants' in chat && <GroupSettings group={chat} />}
      </div>

      {/* Messages area */}
      <ScrollArea className='flex-1 p-4'>
        <div className='space-y-4'>
          {messages.map((message) => {
            const isCurrentUser = message.senderId === currentUser.id

            // Get sender info based on list mode
            const sender =
              listMode === 'groups'
                ? chat?.members.find((m) => m.id === message.senderId)
                : chat

            return (
              <div
                key={message.id}
                className={cn(
                  'flex items-start',
                  isCurrentUser ? 'flex-row-reverse' : 'flex-row',
                  isCurrentUser ? 'space-x-2 space-x-reverse' : 'space-x-2'
                )}
              >
                <Avatar className='flex-shrink-0'>
                  <AvatarImage
                    src={
                      isCurrentUser
                        ? currentUser.profilePictureUrl
                        : sender?.profilePictureUrl || chat?.profilePictureURL
                    }
                    alt={sender?.name || 'User'}
                  />
                  <AvatarFallback>
                    {(sender?.name || chat?.name)?.charAt(0)}
                  </AvatarFallback>
                </Avatar>

                <div
                  className={cn(
                    'max-w-[70%]',
                    isCurrentUser
                      ? 'rounded-l-lg rounded-br-lg bg-gray-900 text-white'
                      : 'rounded-r-lg rounded-bl-lg bg-gray-200 text-gray-900'
                  )}
                >
                  <div className='p-3'>
                    {/* Show sender name in group chat if not current user */}
                    {listMode === 'groups' && !isCurrentUser && (
                      <p className='mb-1 text-sm font-semibold text-gray-700'>
                        {sender?.name || 'Unknown'}
                      </p>
                    )}
                    <p className='whitespace-pre-wrap break-words'>
                      {message.content}
                    </p>
                    <div
                      className={`mt-1 flex items-center justify-between text-xs ${
                        isCurrentUser ? 'text-gray-300' : 'text-gray-500'
                      }`}
                    >
                      <span>{message.sendedAt}</span>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}

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
            // onKeyDown={handleKeyDown}
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
