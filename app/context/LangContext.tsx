import { Dispatch, SetStateAction, createContext, useContext } from "react";

type LangInterface = {
    lang: "ch" | "en",
    setLang: Dispatch<SetStateAction<'CH' | 'EN'>>
}
const LangContext = createContext<LangInterface>({
    lang: "en",
    setLang: () => {}
});

export const useLangContext = () => useContext(LangContext)

export default LangContext;