import { db } from "@/lib/db";
import { isMaster } from "@/lib/utils";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req:Request){
  try {
    const {userId} =auth()
    const {title} = await req.json();

    if(!userId||!isMaster(userId)){
      return new NextResponse('未授权',{status:401})
    }
    const course = await db.course.create({
      data:{
        title,
        userId
      }
    })
    return NextResponse.json(course)
  } catch (error) {
    console.log(error)
    return new NextResponse('网络异常',{status:500})
  }
}

export async function GET(){
  const courses = await db.course.findMany();
  return NextResponse.json(courses)
}