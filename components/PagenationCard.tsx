import Box from "@mui/material/Box";
import Pagination from '@mui/material/Pagination';
import { Dispatch, SetStateAction, useEffect } from "react";
import { ArticleInterface } from "./CardList";
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const NUM_PER_PAGE = 9;

type PaginationProps = {
    searchedArticles: ArticleInterface[],
    page: string,
    // setPage: Dispatch<SetStateAction<number>>,
}

export default function PaginationCard({ searchedArticles, page }: PaginationProps) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const params = new URLSearchParams(searchParams);

    const count = (searchedArticles.length) % NUM_PER_PAGE === 0 ? (searchedArticles.length) / NUM_PER_PAGE : parseInt((searchedArticles.length / NUM_PER_PAGE).toString()) + 1;
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        // setPage(value);
        params.set("page", value.toString())
        replace(`${pathname}?${params}`)
        window.scrollTo({ top: 0, behavior: "smooth" });
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
        <Pagination count={count} variant="outlined" color="primary" page={Number(page)} onChange={handleChange} />
    </Box>
}