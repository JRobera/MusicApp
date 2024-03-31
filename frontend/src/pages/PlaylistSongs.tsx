import { useParams } from "react-router-dom";
import { MainContainer } from "../components/styled/MainContainer";
import { Flex, Heading } from "rebass";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  fetchSongsInPlaylistRequest,
  getAllSongsInPlaylist,
} from "../features/playlist/songsInPlaylistSlice";
import SongItem from "../components/SongItem";
import { Button } from "../components/styled/Button";
import AddSongToPlaylist from "../components/AddSongToPlaylist";
import { getSongStatus } from "../features/songs/songSlice";

export default function PlaylistSong() {
  const { playlist, playlistId } = useParams();
  const dispatch = useDispatch();
  const songsInPlaylist = useSelector(getAllSongsInPlaylist);
  const songsStatus = useSelector(getSongStatus);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchSongsInPlaylistRequest(playlistId));
  }, [dispatch, songsStatus]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <MainContainer>
      <Flex
        css={{
          backgroundColor: "var(--secondary)",
          marginBottom: "5px",
          justifyContent: "space-between",
        }}
      >
        <Heading fontSize="3" fontFamily="sans-serif" marginY={2}>
          Playlist / {playlist}
        </Heading>
        <Button onClick={handleToggle}>Add/Remove</Button>
      </Flex>
      {songsInPlaylist.map((song) => (
        <SongItem song={song} key={song._id} />
      ))}
      {isOpen && playlistId && (
        <AddSongToPlaylist
          songsInPlaylist={songsInPlaylist}
          playlistId={playlistId}
          handleToggle={handleToggle}
        />
      )}
    </MainContainer>
  );
}
