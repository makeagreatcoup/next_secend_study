import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React, { useEffect } from 'react'

const coursePage = async () => {

  return (
    <div className='p-6'>
      <Link href='/master/create'>
        <Button>新建</Button>
      </Link>
    </div>
  )
}

export default coursePage