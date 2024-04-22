import styled from "@emotion/styled";
import { FacebookIcon, FacebookShareButton, TwitterShareButton, WeiboIcon, WeiboShareButton, WhatsappIcon, WhatsappShareButton, XIcon } from "react-share";
import { ArticleInterface } from "./CardList";
import { Dispatch, SetStateAction } from "react";

const Container = styled.div`
  position: absolute;
  top: -14px; 
  left: 0;
  display: flex;
  justify-content: space-between;
  width: 100px;
  height: 40px;
`

type ShareButtonsProps = {
    article: ArticleInterface,
    setShowShareButtons: Dispatch<SetStateAction<boolean>>,
    index: number,
    setHoveredIndex: Dispatch<SetStateAction<number>>,
}

export const ShareButtons = ({ article, setShowShareButtons, index, setHoveredIndex }: ShareButtonsProps) => {

    const handleMouseEnter = (index: number) => {
        setHoveredIndex(index);
        setShowShareButtons(true);
    };

    return (
        <Container onMouseEnter={() => handleMouseEnter(index)}>
            <TwitterShareButton
                url={`https://felix-one.vercel.app/${article.parsedName}`}
                title={`${article.content.slice(0, 70)}...`}
            ><XIcon style={{ width: "22px", height: "22px" }} />
            </TwitterShareButton	>
            <FacebookShareButton
                url={`https://felix-one.vercel.app/${article.parsedName}`}
            ><FacebookIcon style={{ width: "22px", height: "22px" }} />
            </FacebookShareButton>
            <WhatsappShareButton
                url={`https://felix-one.vercel.app/${article.parsedName}`}
            ><WhatsappIcon style={{ width: "22px", height: "22px" }} />
            </WhatsappShareButton>
            <WeiboShareButton
                url={`https://felix-one.vercel.app/${article.parsedName}`}
                title={`${article.content.slice(0, 70)}...`}
            ><WeiboIcon style={{ width: "22px", height: "22px" }} />
            </WeiboShareButton>
        </Container>
    )
}