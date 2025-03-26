import Box from "@mui/material/Box";
import Pagination from '@mui/material/Pagination';
import { ArticleInterface } from "@/context/ArticleContext";
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useThemeContext } from "@/context/ThemeContext";

const NUM_PER_PAGE = 9;

type PaginationProps = {
    page: string,
    articles: ArticleInterface[],
}

export default function PaginationCard({ page, articles }: PaginationProps) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace, push } = useRouter();
    const { theme } = useThemeContext();

    const params = new URLSearchParams(searchParams.toString());

    const count = (articles.length) % NUM_PER_PAGE === 0 ? (articles.length) / NUM_PER_PAGE : parseInt((articles.length / NUM_PER_PAGE).toString()) + 1;
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        if (value === 1) {
            params.delete("page");
            push(`${pathname}?${params.toString()}`, undefined);
        } else {
            params.set("page", value.toString())
            replace(`${pathname}?${params}`)
        }
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
        <Pagination
            count={count}
            variant="outlined"
            page={Number(page)}
            onChange={handleChange}
            sx={{
                "& .MuiPaginationItem-root": {
                    color: theme === "dark" ? "var(--white)" : "var(--black)", // Adjust based on your theme
                    borderColor: theme === "dark" ? "var(--white)" : "var(--black)", // Adjust border color as well
                },
                "& .MuiPaginationItem-ellipsis": {
                    color: theme === "dark" ? "var(--white)" : "var(--black)", // Color for ellipsis
                },
                "& .MuiPaginationItem-page.Mui-selected": {
                    backgroundColor: theme === "dark" ? "#424242" : "#ddd", // Background of the selected page
                    color: theme === "dark" ? "var(--white)" : "var(--black)", // Color of selected page
                },
                "& .MuiPaginationItem-root:hover": {
                    backgroundColor: theme === "dark" ? "#616161" : "var(--light-bg)", // Hover background
                },
            }}
        />
    </Box>
}