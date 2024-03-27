import { fetchArticles } from "../action/page";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import Link from "next/link";

export default async function BlogList() {
    const articles = await fetchArticles();
    return (
        <Container maxWidth="xl">
            <Box
                sx={{
                    gap: 4,
                    flexGrow: 1,
                    display: "flex",
                    justifyContent: "center",
                    flexWrap: "wrap",
                }}
            >
                {articles.map((article) => {
                    return (
                        <Card key={article.title} sx={{ maxWidth: 345 }}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={article.images[0]}
                                    alt="green iguana"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {article.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {`${article.content.slice(0, 70)}...`}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                <Button size="small" color="primary">
                                    Share
                                </Button>
                                <Link href={`/blogs/${article.parsedName}`}><Button size="small">Learn More</Button></Link>
                            </CardActions>
                        </Card>
                    );
                })}
            </Box>
            <Box
                sx={{
                    my: 14,
                    flexGrow: 1,
                    display: "flex",
                    justifyContent: "center",
                    flexWrap: "wrap",
                }}
            >
                {/* <Pagination count={10} variant="outlined" color="primary" /> */}
            </Box>
        </Container>
    )
}