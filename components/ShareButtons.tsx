import styled from "@emotion/styled";
import { FacebookIcon, FacebookShareButton, TwitterShareButton, WeiboIcon, WeiboShareButton, WhatsappIcon, WhatsappShareButton, XIcon } from "react-share";
import { ArticleInterface } from "./CardList";
import { keyframes } from '@emotion/react'

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const Container = styled.div<{show: boolean}>`
  position: absolute;
  top: -14px; 
  left: 0;
  display: flex;
  justify-content: space-between;
  width: 100px;
  height: 40px;
  opacity: ${({ show }) => (show ? 1 : 0)};
  animation: ${({ show }) => (show ? fadeIn : fadeOut)} 0.3s ease-in-out;
`

type ShareButtonsProps = {
    article: ArticleInterface,
    onMouseEnter: () => void,
    onMouseLeave: () => void,
    show: boolean,
}

export const ShareButtons = ({ article, onMouseEnter, onMouseLeave, show }: ShareButtonsProps) => {
    return (
        <Container onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} show={show}>
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