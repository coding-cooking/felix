import Box from "@mui/material/Box";
import Pagination from '@mui/material/Pagination';
import { Dispatch, SetStateAction, useState } from "react";
import { ArticleInterface } from "./CardList";

type PaginationProps = {
    searchedArticles: ArticleInterface[],
    page: number,
    setPage: Dispatch<SetStateAction<number>>,
}

export default function PaginationCard({ searchedArticles, page, setPage }: PaginationProps ){
    const count = (searchedArticles.length) % 9 === 0 ? (searchedArticles.length) / 9 : parseInt((searchedArticles.length / 9).toString()) + 1

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    return <Box
        sx={{
            my: 6,
            flexGrow: 1,
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
        }}
    >
        <Pagination count={count} variant="outlined" color="primary" page={page} onChange={handleChange} />
    </Box>
}