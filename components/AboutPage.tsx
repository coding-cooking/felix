"use client"

import { useThemeContext } from "@/context/ThemeContext";
import styled from "@emotion/styled";

const aboutContent = [
    "I'm Felix, currently based in Sydney, where I build web projects and write about technology, culture, and the world around me.",
    "Previously, I lived and worked in Chengdu, Beijing, and Shenzhen, contributing to some of China's leading internet companies.",
    "I'm deeply interested in intercultural communication—how ideas, technologies, and people move across borders. ",
    "I travel often, exploring different places and sharing my observations along the way.",
    "Please feel free to reach out and connect."
];

const Container = styled.div<{ theme: 'dark' | 'light' }>`
    width: 100%;
    min-height: 100vh;
    background-color: ${props => props.theme === 'dark' ? 'var(--dark-bg)' : 'var(--light-bg)'};
    color: ${props => props.theme === 'dark' ? 'var(--white)' : 'var(--black)'};
`

const Wrapper = styled.div<{ theme: 'dark' | 'light' }>`
    width: 50%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
    border-top: 1px solid ${props => props.theme === 'dark' ? 'var(--dark-border)' : 'var(--light-border)'};

    @media (max-width: 768px) {
        width: 100%;
    }
`

const Title = styled.h1`
    margin: 30px 0;
    font-family: Georgia, 'Times New Roman', Times, serif;
    font-size: 30px;
    font-weight: 600;
    align-self: center;
`

const Paragraph = styled.p`
    width: 100%;
    box-sizing: border-box;
    max-width: 800px;
    line-height: 1.6;
    margin: 2px 0;
    font-size: 18px;
    text-align: left;
    padding: 0 20px;
`

export default function AboutPage() {
    const { theme } = useThemeContext();

    return (
        <Container theme={theme}>
            <Wrapper theme={theme}>
                <Title>About Me</Title>
                {aboutContent.map((paragraph, index) => (
                    <Paragraph key={index}>{paragraph}</Paragraph>
                ))}
            </Wrapper>
        </Container>
    );
}