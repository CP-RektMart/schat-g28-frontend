import { User } from '@/types/user'

export default function listMember({ members }: { members: User[] }) {
  if (!members) {
    return <div>no member</div>
  }

  return (
    <div className='ml-2 flex flex-row gap-2 rounded-sm bg-gray-300 px-2'>
      {members.map((member) => (
        <div key={member.id}>
          <div key={member.id}>{member.name}</div>
          <div className='last:hidden'>•</div>
        </div>
      ))}
    </div>
  )
}
