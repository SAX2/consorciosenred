"use client"

import { cn } from '@/lib/utils';
import Link, { LinkProps } from 'next/link'
import { usePathname } from 'next/navigation';
import React from "react";

interface NavLinkButtonProps {
  activeClassName?: string;
}

const NavLinkButton = ({ activeClassName, className, ...props  }: LinkProps & NavLinkButtonProps & React.HTMLAttributes<HTMLAnchorElement>) => {
  const pathname = usePathname();
  
  const isActive = pathname === props.href;

  return (
    <Link className={cn(className, isActive && activeClassName)} {...props} />
  );
}

export default NavLinkButton