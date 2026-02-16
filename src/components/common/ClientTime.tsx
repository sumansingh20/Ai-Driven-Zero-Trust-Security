"use client";

import { useState, useEffect } from "react";

interface ClientTimeProps {
  format?: "time" | "date" | "datetime";
  className?: string;
}

export function ClientTime({ format = "time", className }: ClientTimeProps) {
  const [time, setTime] = useState<string>("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const updateTime = () => {
      const now = new Date();
      let formattedTime = "";
      
      switch (format) {
        case "time":
          formattedTime = now.toLocaleTimeString();
          break;
        case "date":
          formattedTime = now.toLocaleDateString();
          break;
        case "datetime":
          formattedTime = now.toLocaleString();
          break;
        default:
          formattedTime = now.toLocaleTimeString();
      }
      
      setTime(formattedTime);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, [format]);

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return <span className={className}>--:--:--</span>;
  }

  return <span className={className}>{time}</span>;
}
