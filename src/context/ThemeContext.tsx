import React, { createContext, useContext, useState } from "react"
import { lightTheme, darkTheme, Theme } from "../themes/colors"

export type ThemeMode = "light" | "dark"

type ThemeContextType = {
  theme: Theme
  mode: ThemeMode
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const ThemeProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [mode, setMode] = useState<ThemeMode>("light")

  const theme = mode === "light" ? lightTheme : darkTheme

  const toggleTheme = () => {
    setMode(prev => (prev === "light" ? "dark" : "light"))
  }

  return (
    <ThemeContext.Provider value={{ theme, mode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeContext)

  if (!context) {
    throw new Error("useTheme must be used inside ThemeProvider")
  }

  return context
}