'use client'

import { Chat } from '@/types/chat'
import { Ellipsis } from 'lucide-react'

import { ChatSettingsForm } from '@/components/chat/chat-settings-form'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

import { Button } from '../ui/button'

export interface ChatSettingsProps {
  chat: Chat
}

export function ChatSettings({ chat }: ChatSettingsProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='ghost'>
          <Ellipsis className='h-4 w-4' />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Chat Settings</DialogTitle>
          <ChatSettingsForm chat={chat} />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
