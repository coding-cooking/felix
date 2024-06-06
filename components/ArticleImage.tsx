"use client";

import React, { useState } from 'react';
import styled from "@emotion/styled";
import Stack from '@mui/material/Stack';
import Image from 'next/image';
import Skeleton from '@mui/material/Skeleton';
import { ArticleInterface } from '@/app/context/ArticleContext';

const StyledStack = styled(Stack)`
    width: 100%;
`

const StyledImageWrapper = styled.div`
  position: relative;
  width: 100%;
  margin-top: 0;
  margin-bottom: 20px;
  aspect-ratio: 7/2;
  img {
    object-fit: cover;
  }

  @media (max-width: 768px) {
    margin-top: -0.5em;
    aspect-ratio: 1/1;
  }
`;

type ArticleImageProps = {
    article: ArticleInterface;
}

export const ArticleImage: React.FC<ArticleImageProps> = ({ article }) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);

    return (
        <StyledStack>
            {article.images.map((imageUrl: string, index: number) => (
                <StyledImageWrapper key={index}>
                    <Image
                        src={imageUrl}
                        alt=""
                        fill
                        loading="eager"
                        onLoadingComplete={() => setIsLoading(false)}
                    />
                    {isLoading && <Skeleton variant="rectangular" width="100%" height="100%" animation="wave" />}
                </StyledImageWrapper>
            ))}
        </StyledStack>
    );
};

