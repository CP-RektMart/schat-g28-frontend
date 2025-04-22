import { Menu, X } from 'lucide-react'

interface Props {
  isOpen: boolean
  setIsOpen: (o: boolean) => void
}

export function MobileMenuButton({ isOpen, setIsOpen }: Props) {
  return (
    <button
      className='fixed left-4 top-4 z-50 rounded-md bg-gray-100 p-2 md:hidden'
      onClick={() => setIsOpen(!isOpen)}
    >
      {isOpen ? <X className='h-6 w-6' /> : <Menu className='h-6 w-6' />}
    </button>
  )
}
