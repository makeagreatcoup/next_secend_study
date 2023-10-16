"use client"

import {BarChart, Compass, Layout, List }  from 'lucide-react'
import { SidebarItem } from './sidebar-item'
import { usePathname } from 'next/navigation'

const guestRoutes =[
  {
    icon :Layout,
    label:'Dashboard',
    href:'/',
  
  },  
  {
    icon: Compass,
    label: "Browse",
    href: "/search",
  },
]

const masterRoutes = [
  {
    icon: List,
    label: "Browse",
    href: "/master/courses",
  },
  {
    icon: BarChart,
    label: "Analytics",
    href: "/master/analytics",
  }
]

export const SidebarRoutes=()=>{
  const pathname = usePathname();
  const isMasterPage = pathname?.includes("/master");

  const routes = isMasterPage? masterRoutes: guestRoutes
  return (
    <div className='flex flex-col w-full'>
      {routes.map((route)=>(
        <SidebarItem
          key={route.href}
          label={route.label}
          icon={route.icon}
          href={route.href}
        />
      ))}
    </div>
  )
}