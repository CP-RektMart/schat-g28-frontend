import { cn } from '@/lib/utils'

interface OnlineStatusProps {
  isOnline: boolean
  className?: string
}

export default function OnlineStatus({
  isOnline,
  className,
}: OnlineStatusProps) {
  return (
    <div
      className={cn(
        'h-2.5 w-2.5 rounded-full border-2 border-background',
        isOnline ? 'bg-green-500' : 'bg-gray-300',
        className
      )}
    />
  )
}
