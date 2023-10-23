import { db } from "@/lib/db";
import {  auth, useAuth } from "@clerk/nextjs";

export const getBalance = async () => {
  const {userId} = auth()
  let balance
  try {
    balance = await db.balance.findUnique({
      where:{
        userId:userId!
      }
    })
    if(!balance){
      balance=await db.balance.create({
        data:{
          userId:userId!,
          balanceAmount:0
        }
      })
    }
    const today = new Date()
    today.setHours(0)
    const balanceRecord = await db.balanceRecord.findFirst({
      where:{
        userId:userId!,
        isChecked: true,
        createdAt:{
          gte: today,
          lt: new Date(today.getTime() + 24 * 60 * 60 * 1000)
        }
      }
    })
    return {
      balanceAmount:balance?.balanceAmount||0,
      isChecked:balanceRecord?true:false,
    };
  } catch (error) {
    console.log("[GET_BALANCE]",error);
    return {
      balanceAmount:0,
      updateAt:null
    }
  }

}