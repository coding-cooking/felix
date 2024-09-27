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
import { useLangContext } from "@/context/LangContext";
import LangSwitch from "./LangSwitch";

const StyledContainer = styled(Container)`
  @media (max-width: 768px) {
          margin-bottom: 10px;
        }
`
const StyledAppBar = styled(AppBar)`
  background-color: rgb(var(--header-bg));
`;

const StyledToolBar = styled(Toolbar)`
  gap: 12px;
`;

const StyledLink = styled(Link)`
  color: var(--white);
`;

const TableSeachBar = styled(Container)`
  width: 40%;
  @media (max-width: 768px) {
        display: none;
      }
`

const MobileSeachBar = styled(Container)`
  display: none;
  @media (max-width: 768px) {
    display: block;
    width: 100%;
    margin: 0;
    padding: 0;
  }
`

function HeaderBar() {
  const { lang, setLang } = useLangContext();

  return (
    <StyledAppBar position="fixed" elevation={3}>
      <StyledContainer maxWidth="xl">
        <StyledToolBar disableGutters>
          <StyledLink href="/">
            <LogoSvg width={60} height={35} />
          </StyledLink>

          <TableSeachBar>
            <Suspense><SearchBar /></Suspense>
          </TableSeachBar>

          <Stack sx={{ flexDirection: "row", flexGrow: 1, textAlign: "right", gap: 4, justifyContent: "end", alignItems: "center" }}>
            <LangSwitch setLang={setLang} lang={lang} />
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
        <MobileSeachBar>
          <Suspense><SearchBar /></Suspense>
        </MobileSeachBar>
      </StyledContainer>
    </StyledAppBar>
  );
}
export default HeaderBar;
