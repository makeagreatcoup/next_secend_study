"use client"

import {BarChart, Compass, Layout, List }  from 'lucide-react'
import { SidebarItem } from './sidebar-item'

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

export const SidebarRoutes=()=>{
  const routes = guestRoutes
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