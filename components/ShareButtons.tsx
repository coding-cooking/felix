import styled from "@emotion/styled";
import { FacebookIcon, FacebookShareButton, TwitterShareButton, WeiboIcon, WeiboShareButton, WhatsappIcon, WhatsappShareButton, XIcon } from "react-share";
import { keyframes } from '@emotion/react';
import { ArticleInterface } from "@/app/context/ArticleContext";

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

const Container = styled.div<{ show: boolean }>`
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

const iconStyle = {
  width: "22px",
  height: "22px"
}

export const ShareButtons = ({ article, onMouseEnter, onMouseLeave, show }: ShareButtonsProps) => {
  const shareUrl = `https://felix-one.vercel.app/article/${article._id}`;
  const shareTitle = `${article.content.find(con => con.type === 'paragraph')?.content?.slice(0, 70)}...`;
  return (
    <Container onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} show={show}>
      <TwitterShareButton
        url={shareUrl}
        title={shareTitle}
      >
        <XIcon style={iconStyle} />
      </TwitterShareButton	>
      <FacebookShareButton
        url={shareUrl}
      >
        <FacebookIcon style={iconStyle} />
      </FacebookShareButton>
      <WhatsappShareButton
        url={shareUrl}
      >
        <WhatsappIcon style={iconStyle} />
      </WhatsappShareButton>
      <WeiboShareButton
        url={shareUrl}
        title={shareTitle}
      >
        <WeiboIcon style={iconStyle} />
      </WeiboShareButton>
    </Container>
  )
}