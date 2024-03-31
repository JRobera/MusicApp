import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { Text } from "rebass";

type GenreProps = {
  genre: { genre: string; songCount: number };
};

const GenreItem = styled.div`
  background-color: var(--secondary);
  flex: 1;
  min-width: 10rem;
  max-width: 15rem;
  border-radius: 4px;
  padding: 8px;
  @media (max-width: 390px) {
    max-width: 100%;
  }
`;

export default function Genre({ genre }: GenreProps) {
  return (
    <GenreItem>
      <Link to={genre.genre}>
        <Text fontSize={20}>
          {genre.genre.charAt(0).toUpperCase() + genre.genre.slice(1)}
        </Text>
        <Text>{genre.songCount}</Text>
      </Link>
    </GenreItem>
  );
}
