"use client";
import Container from "@mui/material/Container";
import styled from "@emotion/styled";
import Typography from "@mui/material/Typography";
import Subscription from "./Subscription";
import SubscriptionForm from "./SubscriptionForm";

const Wrapper = styled.div`
  width: 100%;
  height: 100px;
  background-color: rgba(var(--header-bg), 0.9);
`;

const StyledContainer = styled(Container)`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 100%;

  @media (max-width: 768px) {
      flex-direction: column;
    }
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
        <Typography sx={{ order: "1" }}>
          <SubscriptionForm />
        </Typography>
      </StyledContainer>
    </Wrapper >
  );
}
