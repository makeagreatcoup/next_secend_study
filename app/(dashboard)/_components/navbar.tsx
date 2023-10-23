import NavbarRoutes from "@/components/navbar-routes"
import MobileSidebar from "./mobile-sidebar"
import { getBalance } from "@/actions/get-balance"

export const Navbar=async()=>{
  const {balanceAmount,isChecked} = await getBalance();
  return (
    <div className="p-4 border-b h-full flex items-center bg-white shadow-sm">
      <MobileSidebar />
      <NavbarRoutes balance = {balanceAmount} isChecked={isChecked}/>
    </div>
  )
}