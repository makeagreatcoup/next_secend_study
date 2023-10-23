"use client";

import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import { FaCoins } from "react-icons/fa";
import { useConfettiStore } from "@/hooks/use-confetti-store";
import { useRouter } from "next/navigation";
import  useBalanceStore from "@/hooks/use-balance-store";

interface CourseEnrollButtonProps {
  balance: number;
  courseId: string;
}

export const CourseEnrollButton = ({
  balance,
  courseId,
}: CourseEnrollButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const confetti = useConfettiStore();
  const balanceStore = useBalanceStore()
  const router = useRouter();
  const onClick = async () => {
    try {
      setIsLoading(true);

      const balance = await axios.post(`/api/courses/${courseId}/checkout`)
      console.log(balance)
      toast.success("购买成功");
      confetti.onOpen();
      balanceStore.setBalance(balance.data.balanceAmount)
      router.refresh()
    } catch {
      toast.error("网络异常");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Button
      onClick={onClick}
      disabled={isLoading}
      size="sm"
      className="w-full md:w-auto gap-x-1"
    >
      报名 {balance} <FaCoins  color="red"/>
    </Button>
  )
}