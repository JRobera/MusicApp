import { Box, Flex, Heading } from "rebass";
import { MainContainer } from "../components/styled/MainContainer";
import { Button } from "../components/styled/Button";
import Search from "../components/Search";
import SongItem from "../components/SongItem";
import { playlist, song } from "../tyepes";
import { useSelector } from "react-redux";
import { selectAllSongs } from "../features/songs/songSlice";
import { useIsOpen } from "../layout/RootLayout";
import { useSearchFilter } from "../hooks/useSearchFilter";

type SongsProps = {};

export default function Songs({}: SongsProps) {
  const { handleToggle } = useIsOpen();
  const allSongs: playlist = useSelector(selectAllSongs);
  const { currentList: currentPlaylist } = useSearchFilter(allSongs, "song");

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
        {currentPlaylist.map((song: song, idx) => (
          <SongItem song={song} key={idx} />
        ))}
      </Box>
    </MainContainer>
  );
}
