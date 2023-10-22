import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req:Request){
  try {
    const {userId} =auth()
    const balance = await db.balance.create({
      data:{
        userId:userId!,
        balanceAmount:1
      }
    })
    return NextResponse.json(balance)
  } catch (error) {
    console.log(error)
    return new NextResponse('网络异常',{status:500})
  }
}

export async function PATCH(req:Request){
  try {
    const {userId} =auth()
    const { balanceAmount } = await req.json()
    const balance = await db.balance.update({
      where:{
        userId:userId!
      },
      data:{
        balanceAmount:{
          increment:balanceAmount
        }
      },

    })
    return NextResponse.json(balance)
  } catch (error) {
    console.log(error)
    return new NextResponse('网络异常',{status:500})
  }
}

export async function GET(req:Request){
  try {
    const {userId} =auth()
    const course = await db.balance.findUnique({
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