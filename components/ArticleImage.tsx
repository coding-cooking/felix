"use client";

import React, { useState } from 'react';
import styled from "@emotion/styled";
import Stack from '@mui/material/Stack';
import Image from 'next/image';
import Skeleton from '@mui/material/Skeleton';
import { ArticleInterface } from '@/context/ArticleContext';

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
            <StyledImageWrapper>
                <Image
                    src={article.bannerImageUrl}
                    alt=""
                    fill
                    loading="eager"
                    onLoad={() => setIsLoading(false)}
                    quality={75}
                    priority={true}
                />
                {isLoading && <Skeleton variant="rectangular" width="100%" height="100%" animation="wave" />}
            </StyledImageWrapper>
        </StyledStack>
    );
};

