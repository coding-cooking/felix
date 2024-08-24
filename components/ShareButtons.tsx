import styled from "@emotion/styled";
import { FacebookIcon, FacebookShareButton, TwitterShareButton, WeiboIcon, WeiboShareButton, WhatsappIcon, WhatsappShareButton, XIcon } from "react-share";
import { keyframes } from '@emotion/react';
import { ArticleInterface } from "@/app/context/ArticleContext";
import { useLangContext } from "@/app/context/LangContext";

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

const bgStyle = {
  fill: "#fafbfc",
  stroke: "#0a0a0a",
  strokeWidth: '4'
}

export const ShareButtons = ({ article, onMouseEnter, onMouseLeave, show }: ShareButtonsProps) => {
  const { lang } = useLangContext();
  const shareUrl = `https://felix-one.vercel.app/article/${article.handle}`;
  const shareTitle =
    lang === "EN" ? `${article.content.find(con => con.type === 'paragraph')?.englishContent?.slice(0, 120)}...`
      : `${article.content.find(con => con.type === 'paragraph')?.chineseContent?.slice(0, 70)}...`;
  return (
    <Container onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} show={show}>
      <TwitterShareButton
        url={shareUrl}
        title={shareTitle}
      >
        <XIcon size={24} bgStyle={bgStyle} iconFillColor="#26316e" />
      </TwitterShareButton	>
      <FacebookShareButton
        url={shareUrl}
      >
        <FacebookIcon size={24} bgStyle={bgStyle} iconFillColor="#26316e" />
      </FacebookShareButton>
      <WhatsappShareButton
        url={shareUrl}
      >
        <WhatsappIcon size={24} bgStyle={bgStyle} iconFillColor="#26316e" />
      </WhatsappShareButton>
      <WeiboShareButton
        url={shareUrl}
        title={shareTitle}
      >
        <WeiboIcon size={24} bgStyle={bgStyle} iconFillColor="#26316e" />
      </WeiboShareButton>
    </Container>
  )
}