import { useEffect } from "react";
import { MainContainer } from "../components/styled/MainContainer";
import { fetchGenresRequest, getallGenres } from "../features/genre/genreSlice";
import { useDispatch, useSelector } from "react-redux";
import { Flex, Heading } from "rebass";
import Search from "../components/Search";
import styled from "@emotion/styled";
import Genre from "../components/Genre";
import { useSearchFilter } from "../hooks/useSearchFilter";

const GenreContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  overflow: auto;
  max-height: 330px !important;
`;

export default function Genres() {
  const dispatch = useDispatch();
  const genres = useSelector(getallGenres);
  const { currentList: genreList } = useSearchFilter(genres, "genre");

  useEffect(() => {
    dispatch(fetchGenresRequest());
  }, [dispatch]);

  return (
    <MainContainer>
      <Flex
        justifyContent={"space-between"}
        alignItems="center"
        css={{
          backgroundColor: "var(--secondary)",
          padding: "2px",
          borderRadius: "5px",
        }}
      >
        <Search placeholder="Search for an genres..." />
      </Flex>
      <Heading fontSize="3" fontFamily="sans-serif">
        Genres
      </Heading>
      <GenreContainer>
        {genreList.map((genre) => (
          <Genre key={genre.genre} genre={genre} />
        ))}
      </GenreContainer>
    </MainContainer>
  );
}
