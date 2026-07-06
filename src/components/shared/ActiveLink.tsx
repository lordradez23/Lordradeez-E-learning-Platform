"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const ActiveLink = ({ href, children, className, activeClassName = "active",exact }: ActiveLinkProps) => {
  const pathname = usePathname();
  const isActive = exact ? pathname === href : pathname === href || pathname.startsWith(href + "/");

  return (
    <Link href={href} className={cn(className, isActive && activeClassName)}>
      {children}
    </Link>
  );
};

export default ActiveLink;
