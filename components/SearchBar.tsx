"use client"

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { styled } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import InputAdornment from '@mui/material/InputAdornment';
import { useContext, useRef } from "react";
import ArticleContext, { ArticleInterface } from "@/context/ArticleContext";
import Link from "next/link";
import { useLangContext } from "@/context/LangContext";
import ClearIcon from '@mui/icons-material/Clear';

const Search = styled("div")(({ theme }) => ({
}));

export default function SearchBar() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    const articles: ArticleInterface[] = useContext(ArticleContext);
    const inputRef = useRef<HTMLInputElement>(null);
    const { lang } = useLangContext();

    const handleOptionClick = () => {
        inputRef.current?.blur()
    }

    return (
        <Search sx={{ flexGrow: 1 }}>
            <Autocomplete
                freeSolo
                id="free-solo-2-demo"
                sx={{ flexGrow: 1 }}
                options={articles}
                getOptionLabel={(option: string | ArticleInterface) => {
                    return lang === "EN" ? (option as ArticleInterface).englishTitle : (option as ArticleInterface).chineseTitle
                }}
                onChange={(event, value) => {
                    if (value) {
                        handleOptionClick();
                    }
                }}
                componentsProps={{
                    paper: {
                        sx: {
                            width: "auto",
                            margin: "auto",
                            borderTopLeftRadius: 0,
                            borderTopRightRadius: 0,
                        },
                    },
                    clearIndicator: {
                        sx: {
                            color: "white",
                            fontSize: "16px",
                            transition: 'transform 0.2s ease-in-out',
                            '&:hover': {
                                transform: 'scale(1.25)',
                            }
                        }
                    }

                }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        inputRef={inputRef}
                        label=""
                        InputProps={{
                            ...params.InputProps,
                            type: 'text',
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
                                    borderTop: 'none',
                                    borderLeft: 'none',
                                    borderRight: 'none',
                                    borderRadius: 0,
                                    borderBottomColor: 'white',
                                },
                                '&:hover fieldset': {
                                    borderBottomColor: 'white',
                                },
                            },
                        }}
                    />
                )}
                renderOption={(props, option: ArticleInterface) => (
                    <li {...props} key={option.englishTitle}>
                        <Link href={`/article/${option.handle}`} passHref style={{ textDecoration: 'none', color: 'inherit', display: 'block', width: '100%' }} >
                            {lang === "EN" ? option.englishTitle : option.chineseTitle}
                        </Link>
                    </li>
                )}
            />
        </Search>
    )
}