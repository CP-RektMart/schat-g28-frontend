export type MessageType = 'ERROR' | 'MESSSAGE' | 'GROUP'

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
