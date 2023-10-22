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
    return {
      balanceAmount:balance?balance.balanceAmount:0,
      updateAt:balance?balance.updateAt:null
    };
  } catch (error) {
    console.log("[GET_BALANCE]",error);
    return {
      balanceAmount:0,
      updateAt:null
    }
  }

}