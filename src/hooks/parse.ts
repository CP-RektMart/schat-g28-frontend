import { DMMessage, GroupMessage } from '@/types/message'

type parseMessageOutput =
  | { type: 'GROUP'; message: GroupMessage }
  | { type: 'MESSAGE'; message: DMMessage }

export function parseMessage(raw: string): parseMessageOutput | null {
  const [type, rawMsg] = splitFirstSpace(raw)

  if (type == 'ERROR') {
    console.error('failed receive message', rawMsg)
    return null
  }

  if (type != 'GROUP' && type != 'MESSAGE') {
    console.error('invalid type message', type)
    return null
  }

  return {
    type,
    message: JSON.parse(String(rawMsg)),
  }
}

function splitFirstSpace(text: string): string[] {
  const parts = text.split(' ')
  if (parts.length < 2) return parts // No space found
  return [parts[0] as string, parts.slice(1).join(' ')]
}
