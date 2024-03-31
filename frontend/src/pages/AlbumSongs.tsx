import { useParams } from "react-router-dom";
import { MainContainer } from "../components/styled/MainContainer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  fetchSongsInAlbumRequest,
  getAllSongsInAlbum,
} from "../features/albums/songInAlbumSlice";
import SongItem from "../components/SongItem";
import { Heading } from "rebass";
import { getSongStatus } from "../features/songs/songSlice";

export default function AlbumSongs() {
  const { albumName } = useParams();

  const dispatch = useDispatch();
  const songsInAlbum = useSelector(getAllSongsInAlbum);
  const songsStatus = useSelector(getSongStatus);

  useEffect(() => {
    dispatch(fetchSongsInAlbumRequest(albumName));
  }, [dispatch, albumName, songsStatus]);

  return (
    <MainContainer>
      <Heading fontSize="3" fontFamily="sans-serif" marginY={2}>
        Album / {albumName}
      </Heading>
      {songsInAlbum.map((song) => (
        <SongItem key={song._id} song={song} />
      ))}
    </MainContainer>
  );
}
