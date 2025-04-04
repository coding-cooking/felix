"use client"

import { ArticleInterface } from "@/context/ArticleContext";
import { useLangContext } from "@/context/LangContext";
import { useThemeContext } from "@/context/ThemeContext";
import styled from "@emotion/styled";

type ArticleTitleInterface = {
    article: ArticleInterface;
}

const StyledContainer = styled.div`
    color: ${({ theme }) => theme === 'dark' ? 'white' : 'black'};
`

export const ArticleTitle = ({ article }: ArticleTitleInterface) => {
    const { lang } = useLangContext();
    const { theme } = useThemeContext();

    return (
        <StyledContainer theme={theme}>
            {lang === "EN" ? article?.englishTitle : article?.chineseTitle}
        </StyledContainer>
    )
}