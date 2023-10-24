import { getDashboardCourses } from '@/actions/get-dashboard-courses'
import { UserButton, auth } from '@clerk/nextjs'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import InfoCard from './_components/info-card'
import { CoursesList } from '@/components/courses-list'
import { CheckCircle, Clock } from 'lucide-react'

export default async function Dashboard() {

  const {userId} = auth()

  if(!userId){
    return redirect("/")
  }

  const {completedCourses,coursesInProgress} = await getDashboardCourses(userId)


  return (
    <div className='p-6 space-y-4'>
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
        <InfoCard numberOfItems={coursesInProgress.length} label='未完成' icon={Clock} />
        <InfoCard numberOfItems={completedCourses.length} label='已完成' icon={CheckCircle} variant='success'/>
      </div>
      <CoursesList items={[...coursesInProgress,...completedCourses]} />
    </div>
  )
}
