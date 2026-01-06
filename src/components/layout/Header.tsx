"use client";
import React, { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Menu, MenuItem } from "@/components/ui/navbar-menu";

export function Header({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  
  return (
    <div
      className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50", className)}
    >
      <Menu setActive={setActive}>
        <Link href="/">
          <MenuItem setActive={setActive} active={active} item="Home" />
        </Link>
        <Link href="/about">
          <MenuItem setActive={setActive} active={active} item="About" />
        </Link>
        <Link href="/projects">
          <MenuItem setActive={setActive} active={active} item="Projects" />
        </Link>
        <Link href="/contact">
          <MenuItem setActive={setActive} active={active} item="Contact" />
        </Link>
      </Menu>
    </div>
  );
}