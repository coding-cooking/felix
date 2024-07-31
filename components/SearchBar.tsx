"use client"

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { styled } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import { useDebouncedCallback } from "use-debounce";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import InputAdornment from '@mui/material/InputAdornment';
import { useContext, useRef } from "react";
import ArticleContext, { ArticleInterface } from "@/app/context/ArticleContext";
import Link from "next/link";
import ClearIcon from '@mui/icons-material/Clear';

const Search = styled("div")(({ theme }) => ({
    // width: "300px",
    // position: "relative",
    // borderRadius: theme.shape.borderRadius,
    // backgroundColor: alpha(theme.palette.common.white, 0.15),
    // "&:hover": {
    //     backgroundColor: alpha(theme.palette.common.white, 0.25),
    // },
    // marginLeft: 0,
    // width: "100%",
    // display: "flex",
    // alignItems: "center",
    // [theme.breakpoints.up("sm")]: {
    //     marginLeft: theme.spacing(1),
    //     width: "auto",
    // },
}));

export default function SearchBar() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    const articles: ArticleInterface[] = useContext(ArticleContext);
    const inputRef = useRef<HTMLInputElement>(null);

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

    const handleOptionClick = () => {
        inputRef.current?.blur()
    }

    return (
        <Search sx={{ flexGrow: 1 }}>
            <Autocomplete
                freeSolo
                id="free-solo-2-demo"
                disableClearable
                sx={{ flexGrow: 1 }}
                options={articles}
                getOptionLabel={(option: string | ArticleInterface) => (option as ArticleInterface).title}
                onChange={(event, value) => {
                    if (value) {
                        handleOptionClick();
                    }
                }}
                // clearIcon={
                //     <ClearIcon
                //         style={{ color: 'white', fontSize: '16px' }}
                //     />
                // }
                renderInput={(params) => (
                    <TextField
                        {...params}
                        inputRef={inputRef}
                        label=""
                        InputProps={{
                            ...params.InputProps,
                            type: 'search',
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon sx={{ visibility: 'block', color: 'white' }} />
                                </InputAdornment>
                            ),
                            sx: {
                                '& .MuiInputBase-input': {
                                    color: 'white',
                                    fontSize: '16px',
                                },
                                height: '50px',
                                display: 'flex',
                                alignItems: 'center'
                            },
                        }}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: 'gray',
                                },
                                '&:hover fieldset': {
                                    borderColor: 'green',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: 'gray',
                                },
                            },
                        }}
                    />
                )}
                renderOption={(props, option: ArticleInterface) => (
                    <li {...props} key={option.title}>
                        <Link href={`/${option._id}`} passHref style={{ textDecoration: 'none', color: 'inherit', display: 'block', width: '100%' }} >
                            {option.title}
                        </Link>
                    </li>
                )}
            />
        </Search>
    )
}