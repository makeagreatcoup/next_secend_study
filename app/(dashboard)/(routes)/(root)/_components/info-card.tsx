import { IconBadge } from '@/components/icon-badge';
import { LucideIcon } from 'lucide-react';
import React from 'react'

interface InfoCardProps {
  numberOfItems: number;
  variant?: 'default' | 'success';
  label:string;
  icon: LucideIcon;
}

const InfoCard = ({
  variant,icon:Icon,numberOfItems,label
}:InfoCardProps) => {
  return (
    <div className='border flex items-center rounded-md gap-x-2 p-3'>
      <IconBadge icon={Icon} variant={variant}/>
      <div>
        <p className='font-medium'>{label}</p>
        <p>
          {numberOfItems} 课程
        </p>
      </div>
    </div>
  )
}

export default InfoCard