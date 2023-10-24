import Stripe from "stripe";
import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { FlowType } from "@prisma/client";

export async function POST(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const user = await currentUser();
    const { courseId } = params;
    if (!user || !user.id || !user.emailAddresses?.[0]?.emailAddress) {
      return new NextResponse("未授权", { status: 401 });
    }
    
    const course = await db.course.findUnique({
      where: {
        id: courseId,
        isPublished: true,
      }
    });

    if (!course) {
      return new NextResponse("课程数据异常", { status: 404 });
    }
    const courseBalance = course.balance

    const balance = await db.balance.findUnique({
      where :{
        userId: user.id
      },
      select:{
        balanceAmount:true
      }
    })
    // TODO
    if(!balance){
      return new NextResponse("请先签到", { status: 500 });
    }
    const balanceAmount = balance.balanceAmount

    if(balanceAmount < courseBalance){
      return new NextResponse("余额不足", { status: 500 });
    }

    // 插入流水表
    const balanceRecord = await db.balanceRecord.create({
      data:{
        userId:user.id,
        amount:courseBalance,
        type:FlowType.expense,
        desc:'购买课程'
      }
    })
    if(!balanceRecord){
      return new NextResponse("购买课程失败", { status: 500 });
    }
    // 更新余额表
    const balanceUpdate = await db.balance.update({
      where:{
        userId:user.id,
      },
      data:{
        balanceAmount:{
          decrement:courseBalance
        },
      }
    })

    if(!balanceUpdate){
      return new NextResponse("余额处理异常", { status: 500 });
    }

    // 查询采购表
    const purchase = await db.purchase.findUnique({
      where: {
        userId_courseId: {
          userId: user.id,
          courseId: courseId
        }
      }
    });

    if (purchase) {
      return new NextResponse("已付款", { status: 400 });
    }
    // 插入采购表
    const purchase_new = await db.purchase.create({
      data: {
        courseId: courseId,
        userId: user.id,
      }
    });

    if(!purchase_new){
      return new NextResponse("数据异常", { status: 500 });
    }
    // const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [
    //   {
    //     quantity: 1,
    //     price_data: {
    //       currency: "USD",
    //       product_data: {
    //         name: course.title,
    //         description: course.description!,
    //       },
    //       unit_amount: Math.round(course.price! * 100),
    //     }
    //   }
    // ];

    // let stripeCustomer = await db.stripeCustomer.findUnique({
    //   where: {
    //     userId: user.id,
    //   },
    //   select: {
    //     stripeCustomerId: true,
    //   }
    // });

    // if (!stripeCustomer) {
    //   const customer = await stripe.customers.create({
    //     email: user.emailAddresses[0].emailAddress,
    //   });

    //   stripeCustomer = await db.stripeCustomer.create({
    //     data: {
    //       userId: user.id,
    //       stripeCustomerId: customer.id,
    //     }
    //   });
    // }

    // const session = await stripe.checkout.sessions.create({
    //   customer: stripeCustomer.stripeCustomerId,
    //   line_items,
    //   mode: 'payment',
    //   success_url: `${process.env.NEXT_PUBLIC_APP_URL}/courses/${course.id}?success=1`,
    //   cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/courses/${course.id}?canceled=1`,
    //   metadata: {
    //     courseId: course.id,
    //     userId: user.id,
    //   }
    // });

    return NextResponse.json(balance);
  } catch (error) {
    console.log("[COURSE_ID_CHECKOUT]", error);
    return new NextResponse("网络异常", { status: 500 })
  }
}