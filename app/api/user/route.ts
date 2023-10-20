import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req:Request){
  try {
    const {userId} =auth()
    const course = await db.balanceAmount.create({
      data:{
        userId:userId!,
        balanceAmount:0
      }
    })
    return NextResponse.json(course)
  } catch (error) {
    console.log(error)
    return new NextResponse('网络异常',{status:500})
  }
}

export async function GET(req:Request){
  try {
    const {userId} =auth()
    const course = await db.balanceAmount.findUnique({
      where:{
        userId:userId!
      }
    })
    return NextResponse.json(course)
  } catch (error) {
    console.log(error)
    return new NextResponse('网络异常',{status:500})
  }
}