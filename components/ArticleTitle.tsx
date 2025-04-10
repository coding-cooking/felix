"use client"

import { ArticleInterface } from "@/context/ArticleContext";
import { useLangContext } from "@/context/LangContext";
import { useThemeContext } from "@/context/ThemeContext";
import styled from "@emotion/styled";

type ArticleTitleInterface = {
    article: ArticleInterface;
}

const StyledContainer = styled.div<{ theme: 'dark' | 'light', lang: 'EN' | 'CH' }>`
padding-top: 30px;
    color: ${props => props.theme === 'dark' ? 'var(--white)' : 'var(--black)'};
    font-family: ${props => props.lang === 'EN' ? '"Europa", sans-serif' : '"Noto Serif SC", serif'};
    font-size: 30px;
    font-weight: 600;
    text-align: center;
    margin: 0 auto;
`

export const ArticleTitle = ({ article }: ArticleTitleInterface) => {
    const { lang } = useLangContext();
    const { theme } = useThemeContext();

    return (
        <StyledContainer theme={theme} lang={lang}>
            {lang === "EN" ? article?.englishTitle : article?.chineseTitle}
        </StyledContainer>
    )
}