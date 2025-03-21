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

const StyledContainer = styled(Container)`
  @media (max-width: 768px) {
          margin-bottom: 10px;
        }
`

interface StyledAppBarProps {
  customTheme: 'dark' | 'light';
}

const StyledAppBar = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== 'customTheme'
})<StyledAppBarProps>(({ customTheme }) => ({
  backgroundColor: customTheme === 'dark' ? 'black' : 'white'
}));

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
  const { theme, setTheme } = useThemeContext();

  const iconColor = theme === 'dark' ? 'white' : 'black';
  const logoColor = theme === 'dark' ? 'white' : 'black';

  return (
    <StyledAppBar position="fixed" elevation={3} customTheme={theme}>
      <StyledContainer maxWidth="xl">
        <StyledToolBar disableGutters>
          <StyledLink href="/">
            <LogoSvg width={60} height={35} color={logoColor} />
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
        </StyledToolBar>
        {/* <MobileSeachBar>
          <Suspense><SearchBar /></Suspense>
        </MobileSeachBar> */}
      </StyledContainer>
    </StyledAppBar>
  );
}
export default HeaderBar;
