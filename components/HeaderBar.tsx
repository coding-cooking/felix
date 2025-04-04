"use client";

import Link from "next/link";
import AppBar from "@mui/material/AppBar";
import Stack from '@mui/material/Stack';
import Toolbar from "@mui/material/Toolbar";
import GitHubIcon from "@mui/icons-material/GitHub";
import LightModeIcon from '@mui/icons-material/LightMode';
import NightlightRoundIcon from '@mui/icons-material/NightlightRound';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import Container from "@mui/material/Container";
import { styled } from "@mui/material/styles";
import { LogoSvg } from "./Icon";
import { useLangContext } from "@/context/LangContext";
import LangSwitch from "./LangSwitch";
import { useThemeContext } from "@/context/ThemeContext";

interface StyledAppBarProps {
  customTheme: 'dark' | 'light';
}

const StyledContainer = styled(Container)`
  @media (max-width: 768px) {
          margin-bottom: 10px;
        }
`

const StyledAppBar = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== 'customTheme'
})<StyledAppBarProps>(({ customTheme }) => ({
  backgroundColor: customTheme === 'dark' ? 'var(--dark-bg)' : 'var(--light-bg)',
  boxShadow: 'none',
  position: 'static'
}));

const StyledToolBar = styled(Toolbar)`
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const StyledLink = styled(Link)`
  color: var(--white);
`;

const WidgetsWrapper = styled(Stack)`
  display: flex;
  flex-direction: row;
  gap: 24px;
`;

const StyledWidgets = styled(Link, {
  shouldForwardProp: (prop) => prop !== 'customTheme'
})<StyledAppBarProps>(({ customTheme }) => ({
  fontFamily: "'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif",
  fontSize: 16,
  color: customTheme === 'dark' ? 'var(--white)' : 'var(--red)',
  cursor: 'pointer',
  textDecoration: 'none'
}));

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
  const { theme, setTheme } = useThemeContext();

  const iconColor = theme === 'dark' ? 'var(--white)' : 'var(--black)';
  const logoColor = theme === 'dark' ? 'var(--white)' : 'var(--black)';

  return (
    <StyledAppBar elevation={3} customTheme={theme}>
      <StyledContainer maxWidth="xl">
        <StyledToolBar disableGutters>
          <StyledLink href="/">
            <LogoSvg width={90} height={52} color={logoColor} />
          </StyledLink>

          {/* <TableSeachBar>
            <Suspense><SearchBar /></Suspense>
          </TableSeachBar> */}

          <Stack sx={{ flexDirection: "row", flexGrow: 1, textAlign: "right", gap: 4, justifyContent: "end", alignItems: "center" }}>
            <LangSwitch setLang={setLang} lang={lang} />
            <StyledLink href="mailto:felixzhang.rocinante@gmail.com">
              <MailOutlineIcon sx={{ color: iconColor }} />
            </StyledLink>
            <StyledLink
              href="https://github.com/coding-cooking"
              target="_blank"
            >
              <GitHubIcon sx={{ color: iconColor }} />
            </StyledLink>
            {theme === 'light' ?
              <NightlightRoundIcon sx={{ color: iconColor, cursor: 'pointer' }} onClick={() => setTheme('dark')} /> :
              <LightModeIcon sx={{ color: iconColor, cursor: 'pointer' }} onClick={() => setTheme('light')} />
            }
          </Stack>

          <WidgetsWrapper>
            <StyledWidgets customTheme={theme} href="/">Home</StyledWidgets>
            <StyledWidgets customTheme={theme} href="/blog">Blog</StyledWidgets>
            <StyledWidgets customTheme={theme} href="/about">About</StyledWidgets>
            <StyledWidgets customTheme={theme} href="https://x.com/coding_cooking">Twitter</StyledWidgets>
            {/* <StyledWidgets customTheme={theme} href="mailto:felixzhang.rocinante@gmail.com">Contact</StyledWidgets> */}
            <StyledWidgets customTheme={theme} href="/subscribe">Subscribe</StyledWidgets>
          </WidgetsWrapper>

        </StyledToolBar>
        {/* <MobileSeachBar>
          <Suspense><SearchBar /></Suspense>
        </MobileSeachBar> */}
      </StyledContainer>
    </StyledAppBar>
  );
}
export default HeaderBar;
