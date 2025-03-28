import Image from "next/image";
import { useState } from "react";
import Skeleton from '@mui/material/Skeleton';
import styled from "@emotion/styled";
import { ArticleInterface } from "@/context/ArticleContext";

const StyledImage = styled(Image)`
    object-fit: cover;
    @media (max-width: 768px) {
      width: 100%;
      height: 100%;
    }
`

type CardImageProps = {
    article: ArticleInterface,
}

export const CardImage = ({ article }: CardImageProps) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    return <>
        <StyledImage
            src={article.bannerImageUrl}
            width={700}
            height={isLoading ? 0 : 280}
            alt=''
            loading="lazy"
            quality={75}
            onLoad={() => setIsLoading(true)}
            onLoadingComplete={() => setIsLoading(false)}
        />
        {isLoading && (
            <Skeleton
                variant="rectangular"
                width="100%"
                height={140}
                animation="wave"
                style={{ display: 'block' }}
            />
        )}
    </>
}