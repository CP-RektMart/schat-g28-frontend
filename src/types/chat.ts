import type { User } from '@/types/user'

export interface Chat {
  id: string
  name: string
  isGroup: boolean
  lastMessage: string
  timestamp: string
  avatar: string
  unread: number
  participants: User[]
}
