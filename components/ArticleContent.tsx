"use client"

import { ArticleInterface } from '@/context/ArticleContext';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import styled from "@emotion/styled";
import default_image from "../public/default_image.jpg";
import { useLangContext } from '@/context/LangContext';
import { useThemeContext } from '@/context/ThemeContext';

type ArticleContentInterface = {
    article: ArticleInterface;
}

const StyledReactMarkdown = styled(ReactMarkdown) <{ theme: 'dark' | 'light', lang: 'EN' | 'CH' }>`
    line-height: 2;
    margin: 10px 0;
    color: ${({ theme }) => theme === 'dark' ? 'var(--white)' : 'var(--black)'};
    font-family: ${props => props.lang === 'EN' ? '"Europa", sans-serif' : '"Noto Serif SC", serif'};

`

const StyledCaption = styled.p<{ theme: 'dark' | 'light' }>`
    padding-top: 4px;
    font-size: 14px;
    font-weight: 200;
    color: ${({ theme }) => theme === 'dark' ? 'var(--white)' : 'var(--black)'};
`

export const ArticleContent = ({ article }: ArticleContentInterface) => {
    const { lang } = useLangContext();
    const { theme } = useThemeContext();

    return (
        <>
            {article?.content.map((con, index) => {
                return con.type === "paragraph" ?
                    <StyledReactMarkdown key={index} theme={theme} lang={lang}>
                        {lang === "EN" ? con.englishContent : con.chineseContent}
                    </StyledReactMarkdown>
                    : <div key={index} style={{ position: 'relative', width: '100%', height: 'auto', textAlign: 'center' }}>
                        <Image
                            src={con.imageUrl || default_image}
                            alt={lang === "EN" ? con.englishCaption || "Image" : con.chineseCaption || "Image"}
                            sizes="100vw"
                            style={{
                                width: '80%',
                                height: 'auto',
                            }}
                            width={600}
                            height={400}
                        />
                        <StyledCaption theme={theme}>{lang === "EN" ? con.englishCaption : con.chineseCaption}</StyledCaption>
                    </div>
            })}
        </>
    )
}