import type { UserProfile as User } from '@/types/user'

export interface Chat {
  id: string
  name: string
  isGroup: boolean
  lastMessage: string
  timestamp: string
  profilePictureUrl: string
  unread: number
  participants: User[]
}
