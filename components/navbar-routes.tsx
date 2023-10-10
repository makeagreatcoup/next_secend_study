'use client'

import { UserButton, useAuth } from '@clerk/nextjs'
import { useRouter,usePathname } from 'next/navigation'
import React from 'react'
import { Button } from '@/components/ui/button'
import { LogOut } from 'lucide-react'
import Link from "next/link";

const NavbarRoutes = () => {

  const pathname = usePathname()
  const route = useRouter()

  const { userId } = useAuth();

  const isMasterPage = pathname?.includes('/master')
  const isPlayerPage = pathname?.includes('/player')

  const isMaster=(id: string | null | undefined)=>{
    console.log(id)
    return true
  }
  return (
    <div className='flex gap-x-2 ml-auto'>
      {isMasterPage||isPlayerPage?(
        <Link href='/'>
          <Button size='sm' variant='ghost'>
            <LogOut className='h-4 w-4 mr-2'>退出</LogOut>
          </Button>
        </Link>
      ):isMaster(userId)?(
        <Link href='/master/courses'>
          <Button size='sm' variant='ghost'>管理员模式</Button>
        </Link>
      ) : null }
      <UserButton afterSignOutUrl='/'/>
    </div>
  )
}

export default NavbarRoutes