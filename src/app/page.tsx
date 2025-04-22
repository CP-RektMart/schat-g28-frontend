'use client'

import { guJaLogin } from '@/actions/me/set-cookie'
import { MessageCircle } from 'lucide-react'
import { signIn } from 'next-auth/react'

import { Button } from '@/components/ui/button'

export default function LoginPage() {
  const handleLogin = async (login: boolean) => {
    if (login) await guJaLogin('gjl')
    else await guJaLogin('gjs')

    await signIn('google', {
      redirect: true,
      callbackUrl: '/chat',
    })
  }

  return (
    <div className='flex min-h-screen flex-col items-center justify-center bg-gray-50'>
      <div className='w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow-md'>
        <div className='text-center'>
          <div className='mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-100'>
            <MessageCircle className='h-8 w-8 text-gray-600' />
          </div>
          <h2 className='mt-6 text-3xl font-bold text-gray-900'>ChatApp</h2>
          <p className='mt-2 text-sm text-gray-600'>Connect with your pals</p>
        </div>

        <div className='mt-8 space-y-4'>
          <Button
            onClick={() => {
              handleLogin(true)
            }}
            className='flex w-full items-center justify-center gap-2 bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500 text-white hover:opacity-90'
            variant='outline'
          >
            <span className='text-xl font-bold'>G</span>
            <span>Login in with Google</span>
          </Button>

          <div className='text-center text-xs text-gray-500'>
            Computer Network Final Project <br />
            Group 28 ทั้งหล่อและก่อกวน
          </div>
        </div>
      </div>
    </div>
  )
}
