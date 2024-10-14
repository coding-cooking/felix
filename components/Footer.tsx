"use client";
import Container from "@mui/material/Container";
import styled from "@emotion/styled";
import Typography from "@mui/material/Typography";
import SubscriptionForm from "./SubscriptionForm";

const Wrapper = styled.div`
  width: 100%;
  height: 180px;
  background-color: rgba(var(--header-bg), 0.9);
`;

const StyledContainer = styled(Container)`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 40px 0;
  height: 100%;

  @media (max-width: 768px) {
      flex-direction: column;
    }
`

const SubscriptionContainer = styled(Typography)`
  display: flex;
  flex-direction: column;
  order: 1;
  gap: 10px;
`
export default function Footer() {
  return (
    <Wrapper>
      <StyledContainer
        maxWidth="xl"
      >
        <Typography
          variant="overline"
          display="block"
          fontSize={"14px"}
          color={"white"}
          marginBottom={"0px"}
          gutterBottom
          sx={{ order: "2" }}
        >
          Copyright © 2024 | Felix
        </Typography>
        <SubscriptionContainer>
          <Typography variant="body2" gutterBottom color={"white"} sx={{ display: 'block' }}>Enter your email to join my free newsletter:</Typography>
          <SubscriptionForm />
        </SubscriptionContainer>
      </StyledContainer>
    </Wrapper >
  );
}
