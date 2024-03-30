"use client";

import Link from "next/link";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import GitHubIcon from "@mui/icons-material/GitHub";
import Container from "@mui/material/Container";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { LogoSvg } from "./Icon";
import SearchBar from "./SearchBar";
import { Suspense } from "react";

const StyledAppBar = styled(AppBar)`
  background-color: rgb(var(--header-bg));
`;

const StyledToolBar = styled(Toolbar)`
  gap: 12px;
`;

const StyledLink = styled(Link)`
  color: var(--white);
`;

function HeaderBar() {
  return (
    <StyledAppBar position="fixed" elevation={3}>
      <Container maxWidth="xl">
        <StyledToolBar disableGutters>
          <StyledLink href="/">
            <LogoSvg width={60} height={35} />
          </StyledLink>
          <Suspense><SearchBar /></Suspense>
          <Box sx={{ flexGrow: 1, textAlign: "right" }}>
            <StyledLink
              href="https://github.com/coding-cooking"
              target="_blank"
            >
              <GitHubIcon />
            </StyledLink>
          </Box>
        </StyledToolBar>
      </Container>
    </StyledAppBar>
  );
}
export default HeaderBar;
