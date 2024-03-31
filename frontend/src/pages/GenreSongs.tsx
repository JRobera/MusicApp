import { useParams } from "react-router-dom";
import { MainContainer } from "../components/styled/MainContainer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  fetchSongsInGenreRequest,
  getAllSongsInGenre,
} from "../features/genre/songsInGenreSlice";
import SongItem from "../components/SongItem";
import { Heading } from "rebass";

export default function GenreSongs() {
  const { genre } = useParams();
  const dispatch = useDispatch();
  const songsInGenre = useSelector(getAllSongsInGenre);

  useEffect(() => {
    dispatch(fetchSongsInGenreRequest(genre));
  }, [dispatch, genre]);

  return (
    <MainContainer>
      <Heading fontSize="3" fontFamily="sans-serif" marginY={2}>
        Genre / {genre}
      </Heading>
      {songsInGenre.map((song) => (
        <SongItem key={song._id} song={song} />
      ))}
    </MainContainer>
  );
}
