"use client";
import { useState, useEffect } from "react";
import { Hero } from "@/components/home/Hero";
import { PageLoader } from "@/components/ui/PageLoader";

export default function Home() {
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    const shouldShow = sessionStorage.getItem("show-home-loader") === "true";
    
    if (shouldShow) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setShowLoader(true);
    }
  }, []);

  return (
    <>
      {showLoader && (
        <PageLoader 
          duration={4000}
          onLoadingComplete={() => setShowLoader(false)}
        />
      )}
      <div className="flex flex-col">
        <Hero />
      </div>
    </>
  );
}
