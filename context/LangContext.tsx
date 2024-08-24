"use client"

import { Dispatch, SetStateAction, createContext, useContext } from "react";

type LangInterface = {
    lang: "CH" | "EN",
    setLang: Dispatch<SetStateAction<'CH' | 'EN'>>
}
const LangContext = createContext<LangInterface>({
    lang: "EN",
    setLang: () => {}
});

export const useLangContext = () => useContext(LangContext)

export default LangContext;