"use client";
import Container from "@mui/material/Container";
import styled from "@emotion/styled";
import Typography from "@mui/material/Typography";
import SubscriptionForm from "./SubscriptionForm";
import { useThemeContext } from "@/context/ThemeContext";

const Wrapper = styled.div<{ theme: 'dark' | 'light' }>`
  width: 100%;
  height: 180px;
  background-color: ${props => props.theme === 'dark' ? '#000000' : '#ffffff'};
  border-top: 1px solid${props => props.theme === 'dark' ? '#000000' : '#ebedeb'}; 
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
  const { theme } = useThemeContext();
  return (
    <Wrapper theme={theme}>
      <StyledContainer
        maxWidth="xl"
      >
        <Typography
          variant="overline"
          display="block"
          fontSize={"14px"}
          color={theme === 'dark' ? '#ffffff' : '#000000'}
          marginBottom={"0px"}
          gutterBottom
          sx={{ order: "2" }}
        >
          Copyright © 2024 | Felix
        </Typography>
        <SubscriptionContainer>
          <Typography variant="body2" gutterBottom color={theme === 'dark' ? '#ffffff' : '#000000'} sx={{ display: 'block' }}>Enter your email to join my free newsletter:</Typography>
          <SubscriptionForm />
        </SubscriptionContainer>
      </StyledContainer>
    </Wrapper >
  );
}
