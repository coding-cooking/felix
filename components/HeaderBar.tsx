"use client";

import Link from "next/link";
import AppBar from "@mui/material/AppBar";
import Stack from '@mui/material/Stack';
import Toolbar from "@mui/material/Toolbar";
import GitHubIcon from "@mui/icons-material/GitHub";
import Container from "@mui/material/Container";
import { styled } from "@mui/material/styles";
import { LogoSvg } from "./Icon";
import SearchBar from "./SearchBar";
import { Suspense } from "react";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import GTranslateIcon from '@mui/icons-material/GTranslate';
import { useLangContext } from "@/app/context/LangContext";

const StyledAppBar = styled(AppBar)`
  background-color: rgb(var(--header-bg));
`;

const StyledToolBar = styled(Toolbar)`
  gap: 12px;
`;

const StyledLink = styled(Link)`
  color: var(--white);
`;

function HeaderBar( ) {
  const { lang, setLang } = useLangContext();

  return (
    <StyledAppBar position="fixed" elevation={3}>
      <Container maxWidth="xl">
        <StyledToolBar disableGutters>
          <StyledLink href="/">
            <LogoSvg width={60} height={35} />
          </StyledLink>
          <Suspense><SearchBar/></Suspense>
          <Stack sx={{ flexDirection:"row", flexGrow: 1, textAlign: "right", gap: 2, justifyContent: "end"}}>
            <GTranslateIcon sx={{ cursor: "pointer"}} onClick={() => {setLang(prev => prev === "EN" ? "CH" : "EN")}}/>
            <StyledLink href="mailto:felixzhang.rocinante@gmail.com">
              <MailOutlineIcon />
            </StyledLink>
            <StyledLink
              href="https://github.com/coding-cooking"
              target="_blank"
            >
              <GitHubIcon />
            </StyledLink>
          </Stack>
        </StyledToolBar>
      </Container>
    </StyledAppBar>
  );
}
export default HeaderBar;
