"use client"

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { useDebouncedCallback } from "use-debounce";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import InputAdornment from '@mui/material/InputAdornment';
import { useContext } from "react";
import ArticleContext, { ArticleInterface } from "@/app/context/ArticleContext";
import Link from "next/link";

const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(1),
        width: "auto",
    },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    width: "100%",
    "& .MuiInputBase-input": {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create("width"),
        [theme.breakpoints.up("sm")]: {
            width: "12ch",
            "&:focus": {
                width: "20ch",
            },
        },
    },
}));

export default function SearchBar() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    const articles: ArticleInterface[] = useContext(ArticleContext);

    const handleSearch = useDebouncedCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const params = new URLSearchParams(searchParams);

        if (e.target.value) {
            // params.set("page", "1");
            params.delete("page");
            params.set("q", e.target.value);
        } else {
            params.delete("q");
        }
        replace(`${pathname}?${params}`)
    }, 100)

    return (
        <Search sx={{ flexGrow: 1 }}>
            <SearchIconWrapper>
                <SearchIcon />
            </SearchIconWrapper>
            {/* <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                onChange={handleSearch}
            /> */}
            <Autocomplete
                freeSolo
                id="free-solo-2-demo"
                disableClearable
                sx={{ flexGrow: 1 }}
                options={articles.map(article => article.title)}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label=""
                        // sx={{
                        //     '& .MuiInputBase-input': {
                        //         color: "white",
                        //     },
                        //     '& .MuiOutlinedInput-root': {
                        //         height: "40px",
                        //     },
                        // }}

                        InputProps={{
                            ...params.InputProps,
                            type: 'search',
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon sx={{ visibility: 'hidden' }} />
                                </InputAdornment>
                            ),
                        }}
                    />
                )}
            // PaperComponent={({ children }) => (
            //     <Box sx={{ '& .MuiAutocomplete-listbox': { maxHeight: 200 } }}>
            //         {children}
            //     </Box>
            // )}
            />

        </Search>
    )
}