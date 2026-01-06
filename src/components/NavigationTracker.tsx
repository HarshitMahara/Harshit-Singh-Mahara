"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export function NavigationTracker() {
  const pathname = usePathname();
  const isFirstLoad = useRef(true);

  useEffect(() => {
    if (isFirstLoad.current) {
      // First load or reload
      sessionStorage.setItem("show-home-loader", "true");
      isFirstLoad.current = false;
    } else {
      // Client-side navigation
      sessionStorage.setItem("show-home-loader", "false");
    }
  }, [pathname]);

  return null;
}
