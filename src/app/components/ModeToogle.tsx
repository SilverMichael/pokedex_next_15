'use client'

import { AnimatePresence, motion } from "framer-motion"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function ModeToggle() {
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme, setTheme } = useTheme()

  useEffect(() => setMounted(true), [])

  if (!mounted) {
    return (
      <button
        aria-label="Toggle theme"
        className="w-10 h-10 rounded-full bg-transparent"
      />
    )
  }

  return (
    <button
      aria-label="Toggle theme"
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      className={`w-12 h-12 rounded-full
        flex items-center justify-center
        ${resolvedTheme !== 'light' ? 'bg-white' : 'bg-gray-800'}
         
        shadow-lg hover:shadow-xl
        transition-all duration-300
        hover:scale-105
        focus:outline-none focus:ring-2
        focus:ring-blue-500 dark:focus:ring-yellow-400
        border border-gray-200 dark:border-gray-600
        group`}
    >
      <AnimatePresence mode="wait" initial={false}>
        {resolvedTheme === 'dark' ? (
          <motion.div
            key="sun"
            initial={{ opacity: 0, rotate: -30 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: 30 }}
            transition={{ duration: 0.2 }}
          >
            <Sun className="w-5 h-5 text-orange-300" />
          </motion.div>
        ) : (
          <motion.div
            key="moon"
            initial={{ opacity: 0, rotate: 30 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: -30 }}
            transition={{ duration: 0.2 }}
          >
            <Moon className="w-5 h-5 text-blue-800" />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  )
}