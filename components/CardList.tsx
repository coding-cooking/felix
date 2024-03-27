
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import { CategoryType } from "@/type";
import { fetchArticles } from "@/app/action/page";

const data = Array.from(Array(9), (_, i) => {
  const image = i % 2 === 0 ? "/static/cat.jpeg" : "/static/reptile.jpg";
  const name = i % 2 == 0 ? "Cat" : "Lizard";
  return {
    name,
    image,
    desc: `Lizards are a widespread group of squamate reptiles, with over
                6,000 species, ranging across all continents except Antarctica`,
  };
});

type CardListProps = {
  type: CategoryType;
};

export default function CardList(props: CardListProps) {
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
        {data.map((item) => {
          return (
            <Card key={item.name} sx={{ maxWidth: 345 }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image={item.image}
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {item.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.desc}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button size="small" color="primary">
                  Share
                </Button>
                <Button size="small">Learn More</Button>
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
        <Pagination count={10} variant="outlined" color="primary" />
      </Box>
    </Container>
  );
}
