import { ArticleInterface } from "@/context/ArticleContext";
import { useLangContext } from "@/context/LangContext";
import { useThemeContext } from "@/context/ThemeContext";
import styled from "@emotion/styled";
import Link from "next/link";

const Container = styled.div<{ theme: 'dark' | 'light' }>`
    width: 300px;
    height: 140px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    border: 1px solid ${props => props.theme === 'dark' ? 'var(--dark-border)' : 'var(--light-border)'};
    padding: 20px;
    border-radius: 8px;
    width: 300px;
    transition: all 0.2s ease-in-out;

    &:hover {
        transform: translateY(-4px);
    }

    @media (max-width: 768px) {
        min-width: 90%;
    }
`;

const Title = styled.div<{ theme: 'dark' | 'light', lang: 'EN' | 'CH' }>`
    color: ${props => props.theme === 'dark' ? 'var(--white)' : 'var(--black)'};
    font-family: ${props => props.lang === 'EN' ? '"Europa", sans-serif' : '"Noto Serif SC", serif'};
    font-size: 18px;
    font-weight: 500;
    line-height: 1.4;
`;

const StyledDate = styled.div<{ theme: 'dark' | 'light' }>`
    color: ${props => props.theme === 'dark' ? 'var(--gray)' : 'var(--dark-gray)'};
    font-family: "Europa", sans-serif;
    font-size: 14px;
`;

const CardTag = styled.div`
    color: var(--red);
    font-family: "Europa", sans-serif;
    font-size: 14px;
`;

interface LinkToArticleProps {
    article?: ArticleInterface;
}

export default function LinkToArticle({ article }: LinkToArticleProps) {
    const { lang } = useLangContext();
    const { theme } = useThemeContext();

    if (!article) return null;

    const formattedDate = new Date(article.publishedDate).toLocaleDateString(
        lang === "EN" ? "en-US" : "zh-CN"
    );

    return (
        <Link href={`/article/${article.handle}`} style={{ textDecoration: 'none' }}>
            <Container theme={theme}>
                <CardTag>Recent Article</CardTag>
                <Title theme={theme} lang={lang}>
                    {lang === "EN" ? article.englishTitle : article.chineseTitle}
                </Title>
                <StyledDate theme={theme}>
                    {formattedDate}
                </StyledDate>
            </Container>
        </Link>
    )
}
