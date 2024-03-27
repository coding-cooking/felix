"use client";
import Container from "@mui/material/Container";
import styled from "@emotion/styled";
import Typography from "@mui/material/Typography";

const Wrapper = styled.div`
  width: 100%;
  height: 58px;
  background-color: rgba(var(--header-bg), 0.9);
`;

export default function Footer() {
  return (
    <Wrapper>
      <Container
        maxWidth="xl"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <Typography
          variant="overline"
          display="block"
          fontSize={"12px"}
          color={"white"}
          marginBottom={"0px"}
          gutterBottom
        >
          Copyright © 2024 | Felix
        </Typography>
      </Container>
    </Wrapper>
  );
}
