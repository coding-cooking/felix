"use client";

import React, { useEffect, useState } from 'react';
import styled from "@emotion/styled";
import Stack from '@mui/material/Stack';
import Image from 'next/image';
import { ArticleInterface } from "./CardList";
import Skeleton from '@mui/material/Skeleton';

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

  @media (max-width: 700px) {
    margin-top: -0.5em;
  }
`;

interface StyledImageProps {
    article: ArticleInterface;
}

export const StyledImage: React.FC<StyledImageProps> = ({ article }) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
        },100)
    },[article])

    return (
        <StyledStack>
            {article.images.map((imageUrl: string, index: number) => (
                <StyledImageWrapper key={index}>
                    {isLoading
                        ? <Skeleton variant="rectangular" width="100%" height="100%" animation="wave" />
                        : <Image src={imageUrl} alt="" fill />
                    }
                </StyledImageWrapper>
            ))}
        </StyledStack>
    );
};

