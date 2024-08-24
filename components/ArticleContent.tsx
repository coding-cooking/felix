"use client"

import { ArticleInterface } from '@/context/ArticleContext';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import styled from "@emotion/styled";
import default_image from "../public/default_image.jpg";
import { useLangContext } from '@/context/LangContext';

type ArticleContentInterface = {
    article: ArticleInterface;
}

const StyledReactMarkdown = styled(ReactMarkdown)`
    line-height: 2;
    margin: 10px 0;
`

const StyledCaption = styled.p`
    font-size: 14px;
    font-weight: 200;
    color: #a5a6a8;
`

export const ArticleContent = ({ article }: ArticleContentInterface) => {
    const { lang } = useLangContext();

    return (
        <>
            {article.content.map((con, index) => {
                return con.type === "paragraph" ?
                    <StyledReactMarkdown key={index}>
                        {lang === "EN" ? con.englishContent : con.chineseContent}
                    </StyledReactMarkdown>
                    : <div key={index} style={{ position: 'relative', width: '100%', height: 'auto' }}>
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
                        <StyledCaption>{lang === "EN" ? con.englishCaption : con.chineseCaption}</StyledCaption>
                    </div>
            })}
        </>
    )
}