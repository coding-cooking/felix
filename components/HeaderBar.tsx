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

const StyledAppBar = styled(AppBar)`
  background-color: rgb(var(--header-bg));
`;

const StyledToolBar = styled(Toolbar)`
  gap: 12px;
`;

const StyledLink = styled(Link)`
  color: var(--white);
`;

// const Search = styled("div")(({ theme }) => ({
//   position: "relative",
//   borderRadius: theme.shape.borderRadius,
//   backgroundColor: alpha(theme.palette.common.white, 0.15),
//   "&:hover": {
//     backgroundColor: alpha(theme.palette.common.white, 0.25),
//   },
//   marginLeft: 0,
//   width: "100%",
//   [theme.breakpoints.up("sm")]: {
//     marginLeft: theme.spacing(1),
//     width: "auto",
//   },
// }));

// const SearchIconWrapper = styled("div")(({ theme }) => ({
//   padding: theme.spacing(0, 2),
//   height: "100%",
//   position: "absolute",
//   pointerEvents: "none",
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
// }));

// const StyledInputBase = styled(InputBase)(({ theme }) => ({
//   color: "inherit",
//   width: "100%",
//   "& .MuiInputBase-input": {
//     padding: theme.spacing(1, 1, 1, 0),
//     // vertical padding + font size from searchIcon
//     paddingLeft: `calc(1em + ${theme.spacing(4)})`,
//     transition: theme.transitions.create("width"),
//     [theme.breakpoints.up("sm")]: {
//       width: "12ch",
//       "&:focus": {
//         width: "20ch",
//       },
//     },
//   },
// }));

function HeaderBar() {
  return (
    <StyledAppBar position="fixed" elevation={3}>
      <Container maxWidth="xl">
        <StyledToolBar disableGutters>
          <StyledLink href="/">
            <LogoSvg width={60} height={35} />
          </StyledLink>

          <SearchBar />

          {/* <Search sx={{ flexGrow: 1 }}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search> */}

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
