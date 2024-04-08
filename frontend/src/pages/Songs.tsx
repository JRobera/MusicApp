import { Box, Flex, Heading } from "rebass";
import { MainContainer } from "../components/styled/MainContainer";
import { Button } from "../components/styled/Button";
import Search from "../components/Search";
import SongItem from "../components/SongItem";
import { playlist, song } from "../tyepes";
import { useSelector } from "react-redux";
import { getSongStatus, selectAllSongs } from "../features/songs/songSlice";
import { useIsOpen } from "../layout/RootLayout";
import { useSearchFilter } from "../hooks/useSearchFilter";
import { SongItemSkeleton } from "../components/styled/skeleton/song/songSkele";
import { useEffect, useState } from "react";

type SongsProps = {};

export default function Songs({}: SongsProps) {
  const { handleToggle } = useIsOpen();
  const allSongs: playlist = useSelector(selectAllSongs);
  const songStatus = useSelector(getSongStatus);
  const { currentList: currentPlaylist } = useSearchFilter(allSongs, "song");
  const [pageloaded, setPageLoaded] = useState(false);
  useEffect(() => {
    setPageLoaded(true);
  }, []);

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
        <Search placeholder="Search for a song..." />
        <Button margin="0" onClick={handleToggle}>
          Add Song
        </Button>
      </Flex>
      <Heading fontSize="3" fontFamily="sans-serif">
        Songs
      </Heading>
      <Box css={{ overflowY: "auto" }}>
        {songStatus === "pending" && !pageloaded ? (
          <SongItemSkeleton />
        ) : (
          currentPlaylist.map((song: song, idx) => (
            <SongItem song={song} key={idx} />
          ))
        )}
      </Box>
    </MainContainer>
  );
}
