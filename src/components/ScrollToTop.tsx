"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

const SCROLL_THRESHOLD = 700;

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > SCROLL_THRESHOLD);
    };
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("scroll", onScroll);
      }
    };
  }, []);

  const handleClick = () => {
    // Check if the user has reduced motion
    const prefersReduced = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: prefersReduced ? "auto" : "smooth" });
  };

  return (
    <div className={cn("fixed bottom-8 right-8 transition-opacity z-50", visible ? "opacity-100" : "opacity-0 pointer-events-none")}>
      <Button
        size="icon"
        onClick={handleClick}
        className="w-11 h-11 rounded-full shadow-lg bg-primary text-primary-foreground hover:!bg-primary-hover transition-colors"
        style={{
          background: "var(--primary)",
          color: "var(--primary-foreground)",
        }}
      >
        <ArrowUp className="!h-6 !w-6" />
      </Button>
    </div>
  );
}
