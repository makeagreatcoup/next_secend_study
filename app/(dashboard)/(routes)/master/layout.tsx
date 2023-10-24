import { isMaster } from "@/lib/utils";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const MasterLayout = ({
  children
}:{children :React.ReactNode})=>{
  const {userId} = auth()

  if(!isMaster(userId)){
    return redirect('/')
  }

  return <>{children}</>
}

export default MasterLayout;