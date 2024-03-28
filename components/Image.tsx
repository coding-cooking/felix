"use client";

import React from 'react';
import styled from "@emotion/styled";
import Stack from '@mui/material/Stack';
import Image from 'next/image';
import { ArticleInterface } from "./CardList";


const StyledImageWrapper = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16/9;
  img {
    object-fit: cover;
  }
`;

interface StyledImageProps {
    article: ArticleInterface;
}

export const StyledImage: React.FC<StyledImageProps> = ({ article }) => {
    return (
        <Stack direction="row" spacing={2} width="100%">
            {article.images.map((imageUrl: string, index: number) => (
                <StyledImageWrapper key={index}>
                    <Image src={imageUrl} alt="" fill />
                </StyledImageWrapper>
            ))}
        </Stack>
    );
};

