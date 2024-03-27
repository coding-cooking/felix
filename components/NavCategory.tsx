"use client";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import styled from "@emotion/styled";
import { Dispatch, SetStateAction } from "react";
import { CategoryType } from "@/type";

const StyledButton = styled(Button)<{ active: boolean }>`
  color: rgb(var(--nav-category-color));
  background-color: ${(p) =>
    !!p.active ? "rgba(var(--nav-category-active-bg))" : "transparent"};
`;

const categories: CategoryType[] = [
  CategoryType.Newest,
  CategoryType.Life,
  CategoryType.Programming,
  CategoryType.Thoughts,
  CategoryType.Books,
  CategoryType.Movies,
];

type NavCategoryProps = {
  category: CategoryType;
  setActiveCategory: Dispatch<SetStateAction<CategoryType>>;
};

export default function NavCategory(props: NavCategoryProps) {
  return (
    <>
      <Container maxWidth="xl">
        <Box
          sx={{
            mb: 4,
            flexGrow: 1,
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {categories.map((category) => (
            <StyledButton
              key={category}
              size="large"
              active={category === props.category}
              onClick={() => props.setActiveCategory(category)}
            >
              {category}
            </StyledButton>
          ))}
        </Box>
      </Container>
    </>
  );
}
