import { Flex, Heading } from "rebass";
import { MainContainer } from "../components/styled/MainContainer";
import Search from "../components/Search";
import Artist from "../components/audio_player/Artist";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchArtistRequest,
  getAllArtists,
} from "../features/artists/artistsSlice";
import styled from "@emotion/styled";
import { useSearchFilter } from "../hooks/useSearchFilter";

const ArtistsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  overflow: auto;
  height: 100%;
`;

type Props = {};

export default function Artists({}: Props) {
  const dispatch = useDispatch();
  const allArtistsList = useSelector(getAllArtists);
  const { currentList: artistList } = useSearchFilter(allArtistsList, "artist");

  useEffect(() => {
    dispatch(fetchArtistRequest());
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
        <Search placeholder="Search for an artist..." />
      </Flex>
      <Heading fontSize="3" fontFamily="sans-serif">
        Artists
      </Heading>
      <ArtistsContainer>
        {artistList.map((artist) => (
          <Artist key={artist.artist} artist={artist} />
        ))}
      </ArtistsContainer>
    </MainContainer>
  );
}
