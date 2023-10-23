import { db } from "@/lib/db";
import { FlowType } from "@prisma/client";
import { NextResponse } from "next/server";


// 用户修改balance数据
export async function PATCH(req:Request,{ params }: { params: { userId: string } }){
  try {
    const {userId} = params
    const { balanceAmount,desc } = await req.json()
    const balanceRecord = await db.balanceRecord.create({
      data:{
        userId:userId!,
        amount:balanceAmount,
        isChecked:desc?false:true,
        type:FlowType.income,
        desc:desc?desc:"签到奖励"
      }
    })
    if (!balanceRecord) {
      return new NextResponse("未授权", { status: 401 });
    }

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

// export async function GET(req:Request,{ params }: { params: { userId: string } }){
//   try {
//     const {userId} = params
//     const course = await db.balance.findUnique({
//       where:{
//         userId:userId!
//       }
//     })
//     return NextResponse.json(course)
//   } catch (error) {
//     console.log(error)
//     return new NextResponse('网络异常',{status:500})
//   }
// }