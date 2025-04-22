import { useEffect } from 'react'

import { envClientSchema } from '@/config/clientEnvSchema'
import {
  DMMessage,
  DMMessageRequest,
  GroupMessage,
  GroupMessageRequest,
} from '@/types/message'
import useWebSocket from 'react-use-websocket'

import { parseMessage } from './parse'

interface UseMessageInput {
  getDMMessage: (msg: DMMessage) => void
  getGroupMessage: (msg: GroupMessage) => void
  accessToken: string
}

interface UseMessageOutput {
  sendDMMessage: (msg: DMMessageRequest) => void
  sendGroupMessage: (msg: GroupMessageRequest) => void
}

export default function useMessage(inpt: UseMessageInput): UseMessageOutput {
  const { sendMessage, lastMessage } = useWebSocket(
    `${envClientSchema.NEXT_PUBLIC_WEBSOCKET_URL}?accessToken=${inpt.accessToken}`
  )

  useEffect(() => {
    if (lastMessage !== null) {
      const parsed = parseMessage(lastMessage.data)
      if (!parsed) return

      if (parsed.type == 'GROUP') {
        inpt.getGroupMessage(parsed.message)
      } else {
        inpt.getDMMessage(parsed.message)
      }
    }
  }, [lastMessage])

  function sendDMMessage(msg: DMMessageRequest) {
    sendMessage(JSON.stringify(msg))
  }

  function sendGroupMessage(msg: GroupMessageRequest) {
    sendMessage(JSON.stringify(msg))
  }

  return {
    sendDMMessage,
    sendGroupMessage,
  }
}
