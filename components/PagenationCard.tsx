import Box from "@mui/material/Box";
import Pagination from '@mui/material/Pagination';
import { Dispatch, SetStateAction } from "react";
import { ArticleInterface } from "./CardList";

const NUM_PER_PAGE = 9;

type PaginationProps = {
    searchedArticles: ArticleInterface[],
    page: number,
    setPage: Dispatch<SetStateAction<number>>,
}

export default function PaginationCard({ searchedArticles, page, setPage }: PaginationProps) {
    const count = (searchedArticles.length) % NUM_PER_PAGE === 0 ? (searchedArticles.length) / NUM_PER_PAGE : parseInt((searchedArticles.length / NUM_PER_PAGE).toString()) + 1;
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