import { Flex, Heading } from "rebass";
import { MainContainer } from "../components/styled/MainContainer";
import Album from "../components/Album";
import Search from "../components/Search";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAlbumRequest, getAllAlbums } from "../features/albums/albumSlice";
import styled from "@emotion/styled";
import { useSearchFilter } from "../hooks/useSearchFilter";

const AlbumsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  overflow: auto;
  // max-height: 330px !important;
`;

export default function Albums() {
  const dispatch = useDispatch();
  const allAlbumItems = useSelector(getAllAlbums);
  const { currentList: albumList } = useSearchFilter(allAlbumItems, "album");

  useEffect(() => {
    dispatch(fetchAlbumRequest());
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
        <Search placeholder="Search for an album..." />
      </Flex>
      <Heading fontSize="3" fontFamily="sans-serif">
        Albums
      </Heading>
      <AlbumsContainer>
        {albumList.map((album) => (
          <Album key={album.albumTitle} data={album} />
        ))}
      </AlbumsContainer>
    </MainContainer>
  );
}
