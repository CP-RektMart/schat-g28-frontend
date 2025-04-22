// import { Button } from "@/components/ui/button";
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
// import { Label } from "@/components/ui/label";
// import { MessageSquareMore } from "lucide-react";
// import { ChatFriendList } from "../chat-friendlist";
// import { Textarea } from "@/components/ui/textarea";

// interface props {
//     users: User[]
    
// }

// export function DMDialog() {
//   return (
//     <Dialog>
//       <DialogTrigger asChild>
//         <Button className='flex-1'>
//           <MessageSquareMore className='mr-2 h-4 w-4' />
//           Direct
//         </Button>
//       </DialogTrigger>
//       <DialogContent>
//         <DialogHeader>
//           <DialogTitle>Message with new friend</DialogTitle>
//         </DialogHeader>
//         <div className='space-y-4 py-4'>
//           <div className='space-y-2'>
//             <Label>Select your friend</Label>
//             <ChatFriendList
//               friends={users}
//               selectedUser={selectedUser}
//               handleSelectUsers={togglePartnerSelection}
//             />
//           </div>
//           <div className='space-y-2'>
//             <Label htmlFor='initial-message'>First Message</Label>
//             <Textarea
//               className='w-full resize-y rounded-md border p-2 text-sm'
//               id='initial-message'
//               placeholder='Enter your first message'
//               value={initialMessage}
//               onChange={(e) => setInitialMessage(e.target.value)}
//               rows={3}
//             />
//           </div>
//           <Button
//             className='w-full'
//             onClick={handleCreateGroup}
//             disabled={!newGroupName.trim() || selectedUsers.length === 0}
//           >
//             Send Message
//           </Button>
//         </div>
//       </DialogContent>
//     </Dialog>
//   )
// }
