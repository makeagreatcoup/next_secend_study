'use client'

import * as z from 'zod'
import axios from 'axios'
import {zodResolver} from '@hookform/resolvers/zod'
import {useForm} from 'react-hook-form'
import  {useRouter} from 'next/navigation'
import Link from 'next/link'
import toast from 'react-hot-toast'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormLabel,
  FormMessage,
  FormItem,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  title: z.string().min(1,{message:"当前项为必选项"}),
})
const CreatePage = () => {
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),defaultValues:{title:''}})
  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values :z.infer<typeof formSchema>)=>{
    try {
      const res =await axios.post("/api/courses",values)
      router.push(`/master/courses/${res.data.id}`)
      toast.success('创建成功')
    } catch (error) {
      toast.error('创建失败')
      console.log(error)
    }
  }
  return (
    <div className='max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6'>
      <div>
        <h1 className=' text-2xl'>创建新课程</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-8 mt-8'
          >
            <FormField
              name='title'
              control={form.control}
              render={({field}) => (
                <FormItem>
                  <FormLabel className='font-[600]'>标题</FormLabel>

                  <FormControl>
                    <Input 
                    disabled={isSubmitting}
                    {...field} 
                    placeholder='请输入标题' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
                <Link href="/">
                  <Button type="button" variant="ghost">取消</Button>
                </Link>
                <Button type="submit" disabled={!isValid||isSubmitting}>继续</Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default CreatePage