import { useParams } from "react-router-dom";
import { MainContainer } from "../components/styled/MainContainer";
import { Heading } from "rebass";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  fetchArtistSongsRequest,
  getArtistSongs,
} from "../features/artists/artistSongSlice";
import SongItem from "../components/SongItem";
import { getSongStatus } from "../features/songs/songSlice";

export default function ArtistSong() {
  const { artistName } = useParams();

  const dispatch = useDispatch();
  const artistSongs = useSelector(getArtistSongs);
  const songsStatus = useSelector(getSongStatus);

  useEffect(() => {
    dispatch(fetchArtistSongsRequest(artistName));
  }, [dispatch, artistName, songsStatus]);
  return (
    <MainContainer>
      <Heading fontSize="3" fontFamily="sans-serif" marginY={2}>
        Song by: {artistName}
      </Heading>
      {artistSongs.map((song) => (
        <SongItem key={song._id} song={song} />
      ))}
    </MainContainer>
  );
}
