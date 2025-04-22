export type MessageType = 'ERROR' | 'MESSSAGE' | 'GROUP'

export interface DMMessageRequest {
  content: string
  senderId: number
  receiverId: number
}

export interface GroupMessageRequest {
  content: string
  senderId: number
  groupId: number
}

export interface GroupMessage {
  id: number
  content: string
  receiverId: number
  senderId: number
  sendedAt: string
}

export interface DMMessage {
  id: number
  content: string
  groupId: number
  senderId: number
  senderAt: string
}
