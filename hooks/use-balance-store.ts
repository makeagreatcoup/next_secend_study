import { create } from "zustand";
import {  createJSONStorage, persist } from 'zustand/middleware'

type Store = {
  balance: number;
  checkTime: Date |null;
  set:(balanceAmount:number) => void;
  setBalance:(balanceAmount:number) => void;
  setCheckTime:() => void;
  get:()=>{balance:number,checkTime:Date|null};
};

export const useBalanceStore = create<Store>()(
  persist(
    (set, get) => ({
      balance: 0,
      checkTime: null,
      set:(balanceAmount) => {set({balance:balanceAmount,checkTime:new Date()})},
      setBalance:(balanceAmount) => {set({balance:balanceAmount})},
      setCheckTime:() => {set({checkTime:new Date()})},
      get:()=>get()
    }),{
      name: 'balance-store',
      storage: createJSONStorage(()=>localStorage),
    }
  )
  );
