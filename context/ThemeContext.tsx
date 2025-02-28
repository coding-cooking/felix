"use client"

import { Dispatch, SetStateAction, createContext, useContext } from "react";

type ThemeInterface = {
    theme: "light" | "dark",
    setTheme: Dispatch<SetStateAction<'light' | 'dark'>>
}
const ThemeContext = createContext<ThemeInterface>({
    theme: "light",
    setTheme: () => { }
});

export const useThemeContext = () => useContext(ThemeContext)

export default ThemeContext;