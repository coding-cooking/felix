"use client";

import SubscriptionForm from "@/components/SubscriptionForm";
import styled from "@emotion/styled";
import { useThemeContext } from "@/context/ThemeContext";

const Container = styled.div<{ theme: 'dark' | 'light' }>`
    width: 100%;
    height: 100vh;
    background-color: ${props => props.theme === 'dark' ? 'var(--dark-bg)' : 'var(--light-bg)'};
    color: ${props => props.theme === 'dark' ? 'var(--white)' : 'var(--black)'};
`

const FormWrapper = styled.div<{ theme: 'dark' | 'light' }>`
    width: 50%;
    margin: 0 auto;
    padding: 120px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-top: 1px solid ${props => props.theme === 'dark' ? 'var(--dark-border)' : 'var(--light-border)'};
    gap: 20px;

    @media (max-width: 768px) {
        width: 100%;
    }
`;

const Title = styled.h1`
    margin: 30px 0;
    font-family: Georgia, 'Times New Roman', Times, serif;
    font-size: 30px;
    font-weight: 600;
`;

const Label = styled.p`
    font-size: 16px;
`;

export default function Subscribe() {
    const { theme } = useThemeContext();
    return <Container theme={theme}>
        <FormWrapper theme={theme}>
            <Title>Subscribe</Title>
            <Label>Subscribe to my posts in the box below. </Label>
            <SubscriptionForm />
        </FormWrapper>
    </Container>


}