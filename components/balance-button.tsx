'use client'

import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import toast from "react-hot-toast";
import { ReloadIcon } from "@radix-ui/react-icons";
import { FaCoins } from 'react-icons/fa';

import { useAuth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import axios from "axios";
import { useBalanceStore } from "@/hooks/use-balance-store";

export const BalanceButton =  () => {
  const [check, setIsCheck] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [balanceAmount , setBalanceAmount] = useState(0)

  const { userId } = useAuth();
  const balanceStore = useBalanceStore()

  useEffect(()=>{
    const {balance,checkTime } = balanceStore.get()

    if(balance){
      setBalanceAmount(balance)
    }
    // 判断时间是否是今天
    if(checkTime && checkTime.getDate() === new Date().getDate()){
      setIsCheck(true)
    }
  },[])
  if (!userId) {
    return redirect("/");
  }


  const onClick = async () => {
    try {
      setIsLoading(true);
      const balance = await axios.patch(`/api/users/${userId}/balance`,{balanceAmount:1})
      const value = balance.data.balanceAmount
      setTimeout(()=>{
        toast.success("签到成功");
        setIsCheck(true)
        setBalanceAmount(value)
        balanceStore.set(value)
      },500)
    } catch (error) {
      toast.error("网络异常");
    } finally{
      setTimeout(()=>{
        setIsLoading(false)
      },500)
    }

  };
  return (
    <>
      <Button size="sm" variant="ghost" disabled className="gap-x-1 text-red-500" >
        <p>{balanceAmount}</p>
        <FaCoins  color="red"/>
      </Button>
      
      {check ? (
        <Button size="sm" variant="secondary" disabled >
        已签到
      </Button>
      ):(
        isLoading?(
          <Button variant="secondary" size="sm" disabled>
          <ReloadIcon className=" animate-spin" />
          签到
        </Button>
        ):(
          <Button size="sm" variant="secondary" onClick={onClick}>
          签到
        </Button>
        )
      )}
    </>
  );
};
