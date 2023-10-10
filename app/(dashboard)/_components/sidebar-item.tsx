"use client";

import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  href: string;
}

export const SidebarItem = ({ icon: Icon, label, href }: SidebarItemProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const isActive =
    (pathname === "/" && href === "/") ||
    pathname === href ||
    pathname?.startsWith(`${href}/`);

  const onClick = () => {
    router.push(href);
  };
  const textColor = isActive ? "text-sky-700" : "text-slate-500";
  const textHoverColor = isActive ? "hover:text-sky-700" : "hover:text-slate-600";
  const bgColor = isActive ? "bg-sky-200/20" : "";
  const bgHoverColor = isActive ? "hover:bg-sky-200/20" : "hover:bg-slate-300/20";

  const rightBorderColor = isActive ? "border-sky-700" : "border-transparent";

  return (
    <button onClick={onClick} type="button" className={
      `flex items-center gap-x-2 text-sm font-[500] pl-6 transition-all ${textColor} ${textHoverColor} ${bgColor} ${bgHoverColor}`
    
  }>
      <div className="flex items-center gap-x-2 py-4">
        <Icon size={22} 
          className={textColor}
        />
        {label}
      </div>
      <div className={`ml-auto border-2 h-full transition-all ${rightBorderColor}`}></div>
    </button>
  );
};
