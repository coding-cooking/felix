"use client";
import Container from "@mui/material/Container";
import styled from "@emotion/styled";
import Typography from "@mui/material/Typography";
import SubscriptionForm from "./SubscriptionForm";
import { useThemeContext } from "@/context/ThemeContext";

const Wrapper = styled.div<{ theme: 'dark' | 'light' }>`
  width: 100%;
  height: 180px;
  background-color: ${props => props.theme === 'dark' ? 'var(--dark-bg)' : 'var(--light-bg)'};
  border-top: 1px solid ${props => props.theme === 'dark' ? 'var(--dark-border)' : 'var(--light-border)'}; 
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

const SubscriptionContainer = styled.div`
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
          color={theme === 'dark' ? 'var(--white)' : 'var(--black)'}
          marginBottom={"0px"}
          gutterBottom
          sx={{ order: "2" }}
        >
          Copyright  2024 | Felix
        </Typography>
        <SubscriptionContainer>
          <Typography variant="body2" gutterBottom color={theme === 'dark' ? 'var(--white)' : 'var(--black)'} sx={{ display: 'block' }}>Enter your email to join my free newsletter:</Typography>
          <div>
            <SubscriptionForm />
          </div>
        </SubscriptionContainer>
      </StyledContainer>
    </Wrapper >
  );
}
