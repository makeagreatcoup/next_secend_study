import { create } from "zustand";

type Store = {
  balance: number;
  updateTime: Date |null;
  set:(balanceAmount:number) => void;
  get:()=>{balance:number,updateTime:Date|null};
};

export const useBalanceStore = create<Store>((set, get) => ({
  balance: 0,
  updateTime: null,
  set:(balanceAmount) => {set({balance:balanceAmount,updateTime:new Date()})},
  get:()=>get()
}));
