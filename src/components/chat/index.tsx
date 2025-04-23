'use client'

import { useState } from 'react'

import type { Group } from '@/types/group'
import type { ChatMode, DMMessage, GroupMessage } from '@/types/message'
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
  const [groupMsgs] = useState<GroupMessage[]>([])
  const [DMMsgs] = useState<DMMessage[]>([])
  const [selectedUserID, setSelectedUserID] = useState(0)
  const [selectedGroupID, setSelectedGroupID] = useState(0)
  const [chatMode, setChatMode] = useState<ChatMode>('DM')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [selectedColor, setSelectedColor] = useState(
    currentUser.color || 'bg-gray-500'
  )

  console.log(selectedGroupID)

  // const [chats, setChats] = useState<Group[]>([])
  // const [messages, setMessages] = useState<Record<string, Message[]>>(undefined)

  // useEffect(() => {
  //   ;(async () => {
  //     if (chatMode == 'GROUP') {
  //       setGroupMsgs(
  //         (await getGroupMessageHistory(selectedGroupID)) as GroupMessage[]
  //       )
  //     } else {
  //       setDMMsgs(
  //         (await getDirectMessageHistory(selectedUserID)) as DMMessage[]
  //       )
  //     }
  //   })()
  // }, [selectedUserID, selectedGroupID])

  // useEffect(() => {
  //   if (!selectedTalker || !selectedTalker.id) return
  //   ;(async () => {
  //     let data

  //     if (listMode === 'friends') {
  //       data = await getDirectMessageHistory(selectedTalker.id || 0)
  //     } else if (listMode === 'groups') {
  //       data = await getGroupMessageHistory(selectedTalker.id || 0)
  //     }

  //     setSelectedChat(data)
  //     setMessages(data.messages)
  //   })()
  // }, [selectedTalker?.id])

  // const handleSelectChat = (chat: Group) => {
  //   setSelectedChat(chat)
  //   setChats(chats.map((c) => (c.id === chat.id ? { ...c, unread: 0 } : c)))
  //   setIsMobileMenuOpen(false)
  // }

  const handleJoinGroup = (groupId: string) => {
    // In a real app, this would verify the group exists and add the user
    alert(`Joined group with ID: ${groupId}`)
  }

  // const handleUpdateMessages = (newMessage: Message) => {
  //   setMessages((prevMessages) => {
  //     console.log('prevMessages', prevMessages)
  //     console.log('newMessage', newMessage)

  //     return [...prevMessages, newMessage]
  //   })
  // }

  return (
    <div className='flex h-screen bg-gray-50'>
      <ChatSidebar
        users={friends}
        groups={groups}
        chatMode={chatMode}
        setChatMode={setChatMode}
        groupMsgs={groupMsgs}
        dmMsgs={DMMsgs}
        selectedUserID={selectedUserID}
        selectedGroupID={selectedGroupID}
        setSelectedGroupID={setSelectedGroupID}
        setSelectedUserID={setSelectedUserID}
        // chats,
        // selectedChat,
        // onSelectChat,
        myProfile={currentUser}
        // selectedUser,
        // handleSelectUser={() => {}}
        // currentUser={currentUser}
        isMobileMenuOpen={isMobileMenuOpen}
        onJoinGroup={handleJoinGroup}
        // onSelectChat={handleSelectChat}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        // selectedUser={selectedTalker}
        // handleSelectUser={handleSelectTalker}
        // listMode={listMode}
        // setListMode={setListMode}
        selectedColor={selectedColor}
        setSelectedColor={setSelectedColor}
      />
      <ChatArea
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        chatMode={chatMode}
        selectedUserId={selectedUserID}
        selectedGroupId={selectedGroupID}
        accessToken={accessToken}
        currentUser={currentUser}
        chatColor={selectedColor}
      />
      {currentUser.color}
    </div>
  )
}
