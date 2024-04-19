import Image from "next/image"
import { ArticleInterface } from "./CardList"
import { useState } from "react"
import Skeleton from '@mui/material/Skeleton';

type CardImageProps = {
    article: ArticleInterface,
}

export const CardImage = ({ article }: CardImageProps) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    return <>
        <Image src={article.images[0]} width={345} height={140} alt='' style={{ objectFit: 'cover' }} onLoadingComplete={() => setIsLoading(false)} />
        {isLoading && <Skeleton variant="rectangular" width="100%" height={140} animation="wave" />}
    </>
}