'use server'

import { cookies } from 'next/headers'

export async function guJaLogin(gjl: string) {
  const cookieStore = await cookies()

  if (gjl == 'gjl') {
    cookieStore.set('role', gjl)
  } else {
    cookieStore.delete('role')
  }
}
