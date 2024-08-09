"use client"

import { ArticleInterface } from '@/app/context/ArticleContext';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import styled from "@emotion/styled";
import default_image from "../public/default_image.jpg"

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
    return (
        <>
            {article.content.map((con, index) => {
                return con.type === "paragraph" ?
                    <StyledReactMarkdown key={index}>{con.content}</StyledReactMarkdown>
                    : <div key={index} style={{ position: 'relative', width: '100%', height: 'auto' }}>
                        <Image
                            src={con.imageUrl || default_image}
                            alt={con.caption || "Image"}
                            sizes="100vw"
                            style={{
                                width: '100%',
                                height: 'auto',
                            }}
                            width={600}
                            height={400} 
                            />
                        <StyledCaption>{con.caption}</StyledCaption>
                    </div>
            })}
        </>
    )
}