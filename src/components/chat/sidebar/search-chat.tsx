import { Search } from 'lucide-react'

import { Input } from '@/components/ui/input'

interface props {
  searchQuery: string
  setSearchQuery: (s: string) => void
}

export function SearchChat({ searchQuery, setSearchQuery }: props) {
  return (
    <div className='relative mb-4'>
      <Search className='absolute left-3 top-2.5 h-4 w-4 text-gray-400' />
      <Input
        placeholder='Search Chat'
        className='pl-9'
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  )
}
