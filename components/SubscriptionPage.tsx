"use client";

import SubscriptionForm from "@/components/SubscriptionForm";
import styled from "@emotion/styled";
import { useThemeContext } from "@/context/ThemeContext";

const Container = styled.div<{ theme: 'dark' | 'light' }>`
    padding: 120px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    height: 100vh;
    background-color: ${props => props.theme === 'dark' ? 'var(--dark-bg)' : 'var(--light-bg)'};
    color: ${props => props.theme === 'dark' ? 'var(--white)' : 'var(--black)'};
`

const Label = styled.p`
    font-size: 16px;
`;

export default function Subscribe() {
    const { theme } = useThemeContext();
    return <Container theme={theme}>
        <Label>Subscribe to my posts in the box below. </Label>
        <SubscriptionForm />
    </Container>


}