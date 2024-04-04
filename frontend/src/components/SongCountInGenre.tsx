import {
  StatItem,
  StatItemName,
  StatItemQuantity,
} from "./styled/StatComponents";
import { useEffect } from "react";
import {
  fetchSongCountInGenreRequest,
  getSongCountInGenre,
  getSongCountInGenreStatus,
} from "../features/genre/songCountInGenreSlice";
import { useDispatch, useSelector } from "react-redux";
import { SongCountInGenreSkeleton_C } from "./styled/skeleton/statistics/statSkele";

export default function SongCountInGenre() {
  const dispatch = useDispatch();
  const songCountInGenre = useSelector(getSongCountInGenre);
  const songCountInGenreStatus = useSelector(getSongCountInGenreStatus);

  useEffect(() => {
    dispatch(fetchSongCountInGenreRequest());
  }, []);

  return (
    <>
      {songCountInGenreStatus === "pending" ? (
        <SongCountInGenreSkeleton_C />
      ) : (
        songCountInGenre.map((genre) => (
          <StatItem key={genre.genre}>
            <StatItemQuantity>{genre.genreCount}</StatItemQuantity>
            <StatItemName>
              {genre.genre.charAt(0).toUpperCase() + genre.genre.slice(1)}
            </StatItemName>
          </StatItem>
        ))
      )}
    </>
  );
}
