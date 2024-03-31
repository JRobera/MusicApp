import {
  StatItem,
  StatItemName,
  StatItemQuantity,
} from "./styled/StatComponents";
import { useEffect } from "react";
import { fetchSongCountInGenreRequest } from "../features/genre/songCountInGenreSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";

export default function SongCountInGenre() {
  const dispatch = useDispatch();
  const songInGenreCount = useSelector(
    (state: RootState) => state.songCountInGenre.data
  );

  useEffect(() => {
    dispatch(fetchSongCountInGenreRequest());
  }, []);

  return (
    <>
      {songInGenreCount.map((genre) => (
        <StatItem key={genre.genre}>
          <StatItemQuantity>{genre.genreCount}</StatItemQuantity>
          <StatItemName>
            {genre.genre.charAt(0).toUpperCase() + genre.genre.slice(1)}
          </StatItemName>
        </StatItem>
      ))}
    </>
  );
}
