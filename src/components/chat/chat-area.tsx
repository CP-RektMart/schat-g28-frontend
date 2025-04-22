'use client'

import type React from 'react'
import { useEffect, useRef, useState } from 'react'

import { getGroupByID } from '@/actions/group/get-group-by-id'
import { getUserByID } from '@/actions/user/get-user-by-id'
import useMessage from '@/hooks/useMessage'
import { cn } from '@/lib/utils'
import { GroupDetail } from '@/types/group'
import type { ChatMode, DMMessage, GroupMessage } from '@/types/message'
//TODO: change type config
import type { User, UserDetail } from '@/types/user'
import { Menu, Send } from 'lucide-react'

import { GroupSettings } from '@/components/group/group-settings'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'

interface ChatAreaProps {
  setIsMobileMenuOpen: (open: boolean) => void
  chatMode: ChatMode
  selectedUserId: number
  selectedGroupId: number
  accessToken: string
  currentUser: User
  chatColor: string
}

export default function ChatArea({
  selectedUserId,
  selectedGroupId,
  setIsMobileMenuOpen,
  chatMode,
  accessToken,
  currentUser,
  chatColor,
}: ChatAreaProps) {
  const [messageText, setMessageText] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [user, setUser] = useState<UserDetail>()
  const [group, setGroup] = useState<GroupDetail>()

  const { sendDMMessage, sendGroupMessage } = useMessage({
    getDMMessage,
    getGroupMessage,
    accessToken,
  })

  function getDMMessage(msg: DMMessage) {
    // if (chatMode == 'DM') scrollToBottom()
    if (msg.senderId == user?.id || msg.receiverId == user?.id) {
      setUser((u) => {
        let newMsgs = u?.messages
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        newMsgs = [...newMsgs, msg]
        return { ...u, messages: newMsgs }
      })
      // scrollToBottom()
    }
  }

  function getGroupMessage(msg: GroupMessage) {
    // if (chatMode == 'GROUP') scrollToBottom()
    if (msg.groupId == group?.id) {
      setGroup((g) => {
        let newMsgs = g?.messages
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        newMsgs = [...newMsgs, msg]
        return { ...g, messages: newMsgs }
      })
    }
  }

  useEffect(() => {
    setTimeout(() => {
      scrollToBottom()
    }, 100)
  }, [selectedGroupId, selectedUserId, user, group, chatMode])

  useEffect(() => {
    ;(async () => {
      const user = await getUserByID(selectedUserId)
      setUser(user)
    })()
  }, [selectedUserId])

  useEffect(() => {
    ;(async () => {
      const group = await getGroupByID(selectedGroupId)
      setGroup(group)
      console.log(group)
    })()
  }, [selectedGroupId])

  const scrollToBottom = () => {
    console.log('scroll')
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    // messagesEndRef.current?.scrollTo({
    //   top: messagesEndRef.current.scrollHeight,
    //   behavior: 'smooth',
    // })
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (messageText.trim() != '') {
      if (chatMode == 'DM') {
        sendDMMessage({
          content: messageText.trim(),
          receiverId: user?.id as number,
          senderId: currentUser.id as number,
        })
      } else {
        sendGroupMessage({
          content: messageText.trim(),
          groupId: group?.id as number,
          senderId: currentUser.id as number,
        })
      }

      setMessageText('')
    }
  }

  if (!group && !user) {
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
            <AvatarImage
              src={
                chatMode == 'GROUP'
                  ? group?.profilePictureURL
                  : user?.profilePictureURL
              }
              alt='profile picture'
            />
            <AvatarFallback>
              {chatMode == 'GROUP'
                ? group?.name?.charAt(0)
                : user?.name?.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className='flex items-center'>
              <h3 className='font-medium'>
                {chatMode == 'GROUP' ? group?.name : user?.name}
              </h3>
              {chatMode == 'GROUP' && (
                <Badge variant='outline' className='ml-2 bg-gray-100 text-xs'>
                  Group • {group?.members?.length} members
                </Badge>
              )}
            </div>
          </div>
        </div>
        {chatMode == 'GROUP' && group?.owner?.id == currentUser?.id && (
          <GroupSettings group={group as GroupDetail} />
        )}
      </div>

      {/* Messages area */}
      <ScrollArea className='flex-1 p-4'>
        <div className='space-y-4'>
          {chatMode == 'GROUP' &&
            (group?.owner?.id == currentUser?.id ||
              group?.members?.find((m) => m.id == currentUser?.id)) &&
            group?.messages?.map((message) => {
              const isCurrentUser = message.senderId === currentUser.id

              // Get sender info based on list mode
              const sender = group?.members?.find(
                (m) => m.id === message.senderId
              )

              return (
                <div
                  key={`${user?.name}-${message.sendedAt}`}
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
                          : sender?.profilePictureUrl
                      }
                      alt={sender?.name || 'User'}
                    />
                    <AvatarFallback>{sender?.name?.charAt(0)}</AvatarFallback>
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
                      {chatMode == 'GROUP' && !isCurrentUser && (
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

          {chatMode == 'DM' &&
            user?.messages?.map((message) => {
              const isCurrentUser = message.senderId === currentUser.id

              // Get sender info based on list mode
              const sender = user

              return (
                <div
                  key={`${user?.name}-${message.sendedAt}`}
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
                          : sender.profilePictureURL
                      }
                      alt={sender?.name || 'User'}
                    />
                    <AvatarFallback>{sender?.name?.charAt(0)}</AvatarFallback>
                  </Avatar>

                  <div
                    className={cn(
                      'max-w-[70%]',
                      isCurrentUser
                        ? 'rounded-l-lg rounded-br-lg bg-gray-900 text-white'
                        : 'rounded-r-lg rounded-bl-lg bg-gray-200 text-gray-900',
                      isCurrentUser && chatColor
                    )}
                  >
                    <div className='p-3'>
                      {/* Show sender name in group chat if not current user */}
                      {!isCurrentUser && (
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
          <Button
            type='submit'
            disabled={!messageText.trim()}
            className={chatColor}
          >
            <Send className='h-4 w-4' />
          </Button>
        </form>
      </div>
    </div>
  )
}
