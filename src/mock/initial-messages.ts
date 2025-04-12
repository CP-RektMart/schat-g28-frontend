import { Message } from '@/types/message'

export const initialMessages: Record<string, Message[]> = {
  chat1: [
    {
      id: 'msg1',
      chatId: 'chat1',
      senderId: 'user2',
      text: 'Hey, how are you?',
      timestamp: '10:30 AM',
      isEdited: false,
    },
    {
      id: 'msg2',
      chatId: 'chat1',
      senderId: 'user1',
      text: "I'm good, thanks! How about you?",
      timestamp: '10:32 AM',
      isEdited: false,
    },
    {
      id: 'msg3',
      chatId: 'chat1',
      senderId: 'user2',
      text: 'Doing well! Are you free to discuss the project later today?',
      timestamp: '10:33 AM',
      isEdited: false,
    },
  ],
}
