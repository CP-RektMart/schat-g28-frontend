import { ChatMode } from '@/types/message'
import { MessageSquare } from 'lucide-react'

import { Button } from '@/components/ui/button'

interface Props {
  chatMode: ChatMode
  setChatMode: (mode: ChatMode) => void
}

export function SelectChatMode({ chatMode, setChatMode }: Props) {
  return (
    <div className='flex items-center justify-between space-x-2'>
      <Button
        variant={chatMode === 'DM' ? 'default' : 'outline'}
        className='w-full'
        onClick={() => setChatMode('DM')}
      >
        <MessageSquare className='mr-2 h-4 w-4' />
        Private chats
      </Button>
      <Button
        variant={chatMode === 'GROUP' ? 'default' : 'outline'}
        className='w-full'
        onClick={() => setChatMode('GROUP')}
      >
        <MessageSquare className='mr-2 h-4 w-4' />
        Group chats
      </Button>
    </div>
  )
}
