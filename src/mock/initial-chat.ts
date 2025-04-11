import { Chat } from '@/types/chat'
import { UserProfile as User } from '@/types/user'

export const initialChats: Chat[] = [
  {
    id: 'chat1',
    name: 'Jane Smith',
    isGroup: false,
    lastMessage: 'Hey, how are you?',
    timestamp: '10:30 AM',
    profilePictureUrl: '/placeholder.svg?height=40&width=40',
    unread: 2,
    participants: [
      {
        id: 'user1',
        name: 'John Doe',
        profilePictureUrl: '/placeholder.svg?height=40&width=40',
      },
      {
        id: 'user2',
        name: 'Jane Smith',
        profilePictureUrl: '/placeholder.svg?height=40&width=40',
      },
    ] as User[],
  },
  {
    id: 'chat2',
    name: 'Project Team',
    isGroup: true,
    lastMessage: 'Meeting at 2 PM',
    timestamp: 'Yesterday',
    profilePictureUrl: '/placeholder.svg?height=40&width=40',
    unread: 0,
    participants: [
      {
        id: 'user1',
        name: 'John Doe',
        profilePictureUrl: '/placeholder.svg?height=40&width=40',
      },
      {
        id: 'user3',
        name: 'Mike Johnson',
        profilePictureUrl: '/placeholder.svg?height=40&width=40',
      },
      {
        id: 'user4',
        name: 'Sarah Williams',
        profilePictureUrl: '/placeholder.svg?height=40&width=40',
      },
    ] as User[],
  },
  {
    id: 'chat3',
    name: 'Mike Johnson',
    isGroup: false,
    lastMessage: 'Can you send me the files?',
    timestamp: 'Yesterday',
    profilePictureUrl: '/placeholder.svg?height=40&width=40',
    unread: 0,
    participants: [
      {
        id: 'user1',
        name: 'John Doe',
        profilePictureUrl: '/placeholder.svg?height=40&width=40',
      },
      {
        id: 'user3',
        name: 'Mike Johnson',
        profilePictureUrl: '/placeholder.svg?height=40&width=40',
      },
    ] as User[],
  },
  {
    id: 'chat4',
    name: 'Design Team',
    isGroup: true,
    lastMessage: 'New mockups are ready',
    timestamp: 'Monday',
    profilePictureUrl: '/placeholder.svg?height=40&width=40',
    unread: 5,
    participants: [
      {
        id: 'user1',
        name: 'John Doe',
        profilePictureUrl: '/placeholder.svg?height=40&width=40',
      },
      {
        id: 'user5',
        name: 'Emily Davis',
        profilePictureUrl: '/placeholder.svg?height=40&width=40',
      },
      {
        id: 'user6',
        name: 'Alex Turner',
        profilePictureUrl: '/placeholder.svg?height=40&width=40',
      },
    ] as User[],
  },
  {
    id: 'chat5',
    name: 'Design Team',
    isGroup: true,
    lastMessage: 'New mockups are ready',
    timestamp: 'Monday',
    profilePictureUrl: '/placeholder.svg?height=40&width=40',
    unread: 5,
    participants: [
      {
        id: 'user1',
        name: 'John Doe',
        profilePictureUrl: '/placeholder.svg?height=40&width=40',
      },
      {
        id: 'user5',
        name: 'Emily Davis',
        profilePictureUrl: '/placeholder.svg?height=40&width=40',
      },
      {
        id: 'user6',
        name: 'Alex Turner',
        profilePictureUrl: '/placeholder.svg?height=40&width=40',
      },
    ] as User[],
  },
  {
    id: 'chat6',
    name: 'Design Team',
    isGroup: true,
    lastMessage: 'New mockups are ready',
    timestamp: 'Monday',
    profilePictureUrl: '/placeholder.svg?height=40&width=40',
    unread: 5,
    participants: [
      {
        id: 'user1',
        name: 'John Doe',
        profilePictureUrl: '/placeholder.svg?height=40&width=40',
      },
      {
        id: 'user5',
        name: 'Emily Davis',
        profilePictureUrl: '/placeholder.svg?height=40&width=40',
      },
      {
        id: 'user6',
        name: 'Alex Turner',
        profilePictureUrl: '/placeholder.svg?height=40&width=40',
      },
    ] as User[],
  },
  {
    id: 'chat7',
    name: 'Design Team',
    isGroup: true,
    lastMessage: 'New mockups are ready',
    timestamp: 'Monday',
    profilePictureUrl: '/placeholder.svg?height=40&width=40',
    unread: 5,
    participants: [
      {
        id: 'user1',
        name: 'John Doe',
        profilePictureUrl: '/placeholder.svg?height=40&width=40',
      },
      {
        id: 'user5',
        name: 'Emily Davis',
        profilePictureUrl: '/placeholder.svg?height=40&width=40',
      },
      {
        id: 'user6',
        name: 'Alex Turner',
        profilePictureUrl: '/placeholder.svg?height=40&width=40',
      },
    ] as User[],
  },
  {
    id: 'chat8',
    name: 'Design Team',
    isGroup: true,
    lastMessage: 'New mockups are ready',
    timestamp: 'Monday',
    profilePictureUrl: '/placeholder.svg?height=40&width=40',
    unread: 5,
    participants: [
      {
        id: 'user1',
        name: 'John Doe',
        profilePictureUrl: '/placeholder.svg?height=40&width=40',
      },
      {
        id: 'user5',
        name: 'Emily Davis',
        profilePictureUrl: '/placeholder.svg?height=40&width=40',
      },
      {
        id: 'user6',
        name: 'Alex Turner',
        profilePictureUrl: '/placeholder.svg?height=40&width=40',
      },
    ] as User[],
  },
]
