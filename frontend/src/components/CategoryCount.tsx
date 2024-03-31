import { BsMusicNote, BsPersonFill } from "react-icons/bs";
import {
  StatItem,
  StatItemName,
  StatItemQuantity,
} from "./styled/StatComponents";
import { RiEqualizerFill } from "react-icons/ri";
import { MdLibraryMusic } from "react-icons/md";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCatCountRequest,
  getAllCatCount,
} from "../features/statistics/categoryCountSlice";

export default function CategoryCount() {
  const dispatch = useDispatch();
  const category = useSelector(getAllCatCount);

  useEffect(() => {
    dispatch(fetchCatCountRequest());
  }, []);

  return (
    <>
      {category.map((cat, idx) =>
        cat.songCount ? (
          <StatItem key={idx}>
            <BsMusicNote size={20} />
            <StatItemQuantity>{cat.songCount}</StatItemQuantity>
            <StatItemName>Songs</StatItemName>
          </StatItem>
        ) : cat.albumCount ? (
          <StatItem key={idx}>
            <MdLibraryMusic size={20} />
            <StatItemQuantity>{cat.albumCount}</StatItemQuantity>
            <StatItemName>Albums</StatItemName>
          </StatItem>
        ) : cat.artistCount ? (
          <StatItem key={idx}>
            <BsPersonFill size={20} />
            <StatItemQuantity>{cat.artistCount}</StatItemQuantity>
            <StatItemName>Artists</StatItemName>
          </StatItem>
        ) : cat.genreCount ? (
          <StatItem key={idx}>
            <RiEqualizerFill size={20} />
            <StatItemQuantity>{cat.genreCount}</StatItemQuantity>
            <StatItemName>Genres</StatItemName>
          </StatItem>
        ) : null
      )}
    </>
  );
}
