"use client";

import styled from "@emotion/styled";
import Image from "next/image";

const StyledImageWrapper = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16/9;
  img {
    object-fit: cover;
  }
`;

export const StyledImage = (props: {
    imageUrl: string
}) => {
    return <StyledImageWrapper>
        <Image src={props.imageUrl} alt="" fill >
        </Image>
    </StyledImageWrapper>
}