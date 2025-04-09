"use client"

import ArticleContext, { ArticleInterface } from "@/context/ArticleContext";
import { useContext } from "react";
import { useLangContext } from "@/context/LangContext";
import { useThemeContext } from "@/context/ThemeContext";
import { ArticleTitle } from "./ArticleTitle";
import { ArticleContent } from "./ArticleContent";
import styled from "@emotion/styled";
import RecentArticle from "./RecentArticle";

const Container = styled.div<{ theme: 'dark' | 'light' }>`
    background-color: ${props => props.theme === 'dark' ? 'var(--dark-bg)' : 'var(--light-bg)'};
    padding: 60px 0 ;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Wrapper = styled.div<{ theme: 'dark' | 'light' }>`
    display: flex;
    flex-direction: column;
    gap: 20px;
    justify-content: center;
    align-items: center;
    width: 50%;

    @media (max-width: 768px) {
        width: 90%;
    }
`;

const TitleWrapper = styled.div<{ theme: 'dark' | 'light', lang: 'EN' | 'CH' }>`
    margin: 0 auto;
    color: ${props => props.theme === 'dark' ? 'var(--white)' : 'var(--black)'};
    font-family: ${props => props.lang === 'EN' ? '"Europa", sans-serif' : '"Noto Serif SC", serif'};
    font-size: 30px;
    font-weight: 600;
    line-height: 1.5;
    text-align: center;
`

const DateWrapper = styled.div<{ theme: 'dark' | 'light' }>`
    color: ${props => props.theme === 'dark' ? 'var(--white)' : 'var(--black)'};
    font-family: "Europa", sans-serif;
    font-size: 14px;
    font-weight: 400;
    line-height: 1.5;
    text-align: center;
`;

const ContentWrapper = styled.div<{ theme: 'dark' | 'light', lang: 'EN' | 'CH' }>`
    color: ${props => props.theme === 'dark' ? 'var(--white)' : 'var(--black)'};
    font-family: ${props => props.lang === 'EN' ? '"minion-pro", sans-serif' : '"Noto Serif SC", serif'};
    font-size: ${props => props.lang === 'EN' ? '16px' : '18px'};
    font-weight: 400;
    line-height: 1.8;
`;

const ArticleLinkWrapper = styled.div<{ theme: 'dark' | 'light' }>`
    width: 100%;
    display: flex;
    gap: 20px;
    justify-content: space-between;
    align-items: center;
    color: ${props => props.theme === 'dark' ? 'var(--white)' : 'var(--black)'};

    @media (max-width: 768px) {
        flex-direction: column;
        gap: 20px;
    }
`;

export default function HomePage() {
    const { lang } = useLangContext();
    const { theme } = useThemeContext();
    const articles: ArticleInterface[] = useContext(ArticleContext);
    const sortedArticles = articles?.sort((a, b) => {
        const dateA = new Date(a.publishedDate);
        const dateB = new Date(b.publishedDate);
        return dateB.getTime() - dateA.getTime();
    })
    const mostRecentArticle = sortedArticles?.[0];
    const secondRecentArticle = sortedArticles?.[1];
    const thirdRecentArticle = sortedArticles?.[2];

    return (
        <Container theme={theme}>
            <Wrapper theme={theme}>
                <TitleWrapper theme={theme} lang={lang}>
                    <ArticleTitle article={mostRecentArticle} />
                </TitleWrapper>
                <DateWrapper theme={theme}>
                    {mostRecentArticle?.publishedDate &&
                        <p>{new Date(mostRecentArticle.publishedDate).toLocaleDateString(lang === "EN" ? "en-US" : "zh-CN")}</p>
                    }
                </DateWrapper>
                <ContentWrapper theme={theme} lang={lang}>
                    <ArticleContent article={mostRecentArticle} />
                </ContentWrapper>

                <ArticleLinkWrapper theme={theme}>
                    <RecentArticle article={secondRecentArticle} />
                    <RecentArticle article={thirdRecentArticle} />
                </ArticleLinkWrapper>
            </Wrapper>

        </Container>
    )
}