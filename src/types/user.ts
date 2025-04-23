import { components } from '@/api/schema'

export type UserProfile = {
  id?: number
  name: string
  email: string
  profilePictureUrl: string
  isOnline?: boolean
}

export type User = components['schemas']['dto.UserResponse']
export type UserDetail = components['schemas']['dto.UserDetailResponse']
