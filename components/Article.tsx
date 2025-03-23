"use client"

import Stack from '@mui/material/Stack';
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { ArticleImage } from "@/components/ArticleImage";
import { ArticleInterface } from '@/context/ArticleContext';
import { RecentArticles } from '@/components/RecentArticles';
import { ArticleContent } from '@/components/ArticleContent';
import { ArticleTitle } from '@/components/ArticleTitle';
import { ArticleTag } from '@/components/ArticleTag';
import { DiscussionEmbed, CommentCount } from 'disqus-react';
import { useThemeContext } from '@/context/ThemeContext';

type ArticleProps = {
    article: ArticleInterface,
    handle: string,
}

export const Article = ({ article, handle }: ArticleProps) => {
    const articleDate = new Date(article.publishedDate);
    const { theme } = useThemeContext();

    const bgColor = theme === "dark" ? "#000000" : "#ffffff";
    const txColor = theme === "dark" ? "#ffffff" : "#000000";

    const disqusShortname = "felixs-blog-1";

    const disqusConfig = {
        url: `https://felix-one.vercel.app/article/${handle}`,
        identifier: article.id,
        title: article.englishTitle,
        language: 'en_US',
    };

    return (
        <Stack sx={{ backgroundColor: bgColor }}>
            <ArticleImage article={article} />
            <Container maxWidth="lg" sx={{
                width: "100%",
                display: "flex",
                gap: "60px",
                color: txColor
            }}>
                <Box
                    sx={{
                        mb: 4,
                        flexGrow: 1,
                        display: "flex",
                        flexDirection: "column",
                        flexWrap: "wrap",
                        flex: 3,
                    }}
                >
                    <Typography variant="h4" lineHeight={2} gutterBottom sx={{ "@media (max-width: 768px)": { fontSize: "24px", fontWeight: "400" } }}>
                        <ArticleTitle article={article} />
                    </Typography>
                    <Typography variant="subtitle1" lineHeight={3} gutterBottom sx={{ color: txColor, "@media (max-width: 768px)": { fontSize: "14px" } }}>
                        {articleDate.toLocaleDateString()}
                    </Typography>
                    <Box>
                        <Typography variant="body1" lineHeight={2} gutterBottom sx={{ color: txColor }}>
                            <ArticleTag article={article} />
                        </Typography>
                        <Box>
                            <ArticleContent article={article} />
                        </Box>
                        <Box sx={{ margin: "30px 0" }}>
                            <CommentCount shortname={disqusShortname} config={disqusConfig}>
                                Comments
                            </CommentCount>
                            <DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
                        </Box>

                    </Box>
                </Box>
                <Box sx={{ flex: 1, "@media (max-width: 768px)": { display: "none" } }}>
                    <RecentArticles handle={handle} />
                </Box>
            </Container>
        </Stack>

    )
}