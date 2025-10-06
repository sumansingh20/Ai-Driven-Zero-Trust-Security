"use client"

import { useState, useEffect } from "react"

interface ClientTimeProps {
  format?: "time" | "date" | "datetime"
  className?: string
  showSeconds?: boolean
}

export function ClientTime({ format = "time", className = "", showSeconds = true }: ClientTimeProps) {
  const [time, setTime] = useState<string>("")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    const updateTime = () => {
      const now = new Date()
      let timeString = ""
      
      switch (format) {
        case "time":
          timeString = showSeconds 
            ? now.toLocaleTimeString() 
            : now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          break
        case "date":
          timeString = now.toLocaleDateString()
          break
        case "datetime":
          timeString = now.toLocaleString()
          break
      }
      
      setTime(timeString)
    }

    updateTime()
    
    // Update every second for time displays, every minute for others
    const interval = setInterval(updateTime, showSeconds ? 1000 : 60000)
    
    return () => clearInterval(interval)
  }, [format, showSeconds])

  // Return empty span during SSR to prevent hydration mismatch
  if (!mounted) {
    return <span className={className}></span>
  }

  return <span className={className}>{time}</span>
}

interface ClientDateProps {
  date: string | Date
  format?: "time" | "date" | "datetime"
  className?: string
}

export function ClientDate({ date, format = "date", className = "" }: ClientDateProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Return empty span during SSR to prevent hydration mismatch
  if (!mounted) {
    return <span className={className}></span>
  }

  const dateObj = typeof date === 'string' ? new Date(date) : date
  let formattedDate = ""

  switch (format) {
    case "time":
      formattedDate = dateObj.toLocaleTimeString()
      break
    case "date":
      formattedDate = dateObj.toLocaleDateString()
      break
    case "datetime":
      formattedDate = dateObj.toLocaleString()
      break
  }

  return <span className={className}>{formattedDate}</span>
}

interface ClientTimestampProps {
  timestamp: string | Date | number
  format?: "time" | "date" | "datetime"
  className?: string
}

export function ClientTimestamp({ timestamp, format = "datetime", className = "" }: ClientTimestampProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Return empty span during SSR to prevent hydration mismatch
  if (!mounted) {
    return <span className={className}></span>
  }

  const dateObj = new Date(timestamp)
  let formattedTimestamp = ""

  switch (format) {
    case "time":
      formattedTimestamp = dateObj.toLocaleTimeString()
      break
    case "date":
      formattedTimestamp = dateObj.toLocaleDateString()
      break
    case "datetime":
      formattedTimestamp = dateObj.toLocaleString()
      break
  }

  return <span className={className}>{formattedTimestamp}</span>
}
