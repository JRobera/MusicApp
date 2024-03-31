import { useRef } from "react";
import { Flex, Heading } from "rebass";
import SongToBeAdded from "./SongToBeAdded";
import { useSelector } from "react-redux";
import { selectAllSongs } from "../features/songs/songSlice";
import { song } from "../tyepes";
import { OverLay } from "./styled/Overlay";
import { Container } from "./styled/Container";

type AddSongToPlaylistProps = {
  songsInPlaylist: song[];
  playlistId: string;
  handleToggle: () => void;
};

export default function AddSongToPlaylist({
  songsInPlaylist,
  playlistId,
  handleToggle,
}: AddSongToPlaylistProps) {
  const allSongs = useSelector(selectAllSongs);
  const overLayRef = useRef(null);

  const handleOverLayClick = (event: React.MouseEvent) => {
    if (event.target === overLayRef.current) {
      handleToggle();
    }
  };

  const checkIsAdded = (songId: string) => {
    const foundsong = songsInPlaylist.filter((item) => item._id === songId);
    if (foundsong.length === 0) {
      return false;
    } else {
      return true;
    }
  };

  return (
    <OverLay ref={overLayRef} onClick={handleOverLayClick}>
      <Container>
        <Heading fontFamily={"sans-serif"}>Add To Playlist</Heading>
        <Flex
          flexWrap={"wrap"}
          css={{
            width: "100%",
            minHeight: "10rem",
            height: "15rem",
            overflowY: "auto",
            padding: "5px",
            backgroundColor: "var(--primary)",
          }}
        >
          {allSongs?.map((song) => (
            <SongToBeAdded
              key={song._id}
              song={song}
              playlistId={playlistId}
              isAdded={checkIsAdded(song._id)}
            />
          ))}
        </Flex>
      </Container>
    </OverLay>
  );
}
