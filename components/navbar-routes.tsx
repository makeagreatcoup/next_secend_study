'use client'

import { UserButton, useAuth } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'
import React from 'react'
import { Button } from '@/components/ui/button'
import { LogOut } from 'lucide-react'
import Link from "next/link";
import { isMaster } from '@/lib/utils'
import { SearchInput } from './search-input'

const NavbarRoutes = () => {

  const pathname = usePathname()

  const { userId } = useAuth();
  console.log(userId)
  const isMasterPage = pathname?.includes('/master')
  const isPlayerPage = pathname?.includes('/courses')
  const isSearchPage = pathname === "/search";
  
  return (
    <>
    {isSearchPage && (
      <div className="hidden md:block">
        <SearchInput />
      </div>
    )}
    <div className='flex gap-x-2 ml-auto'>
      {isMasterPage||isPlayerPage?(
        <Link href='/'>
          <Button size='sm' variant='ghost'>
            <LogOut className='h-4 w-4 mr-2' />
            退出
          </Button>
        </Link>
      ):isMaster(userId)?(
        <Link href='/master/courses'>
          <Button size='sm' variant='ghost'>管理员模式</Button>
        </Link>
      ) : null }
      <UserButton afterSignOutUrl='/'/>
    </div>
    </>
    
  )
}

export default NavbarRoutes