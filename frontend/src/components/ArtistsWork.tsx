import { useEffect } from "react";
import {
  ArtistWork,
  StatItemName,
  StatItemQuantity,
} from "./styled/StatComponents";
import { Box, Text } from "rebass";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchArtistsWorkRequest,
  getAllArtistsWork,
} from "../features/statistics/artistsWorkSlice";

export default function ArtistsWork() {
  const dispatch = useDispatch();
  const artistsWork = useSelector(getAllArtistsWork);

  useEffect(() => {
    dispatch(fetchArtistsWorkRequest());
  }, [dispatch]);
  return (
    <>
      {artistsWork.map((work) => (
        <ArtistWork key={work.artistName}>
          <Text fontSize={"20px"} flex={1} fontWeight={500}>
            {work.artistName}
          </Text>
          <Box
            textAlign={"center"}
            css={{ borderLeft: "1px var(--bg-player) solid" }}
            flex={1}
          >
            <StatItemName>
              Number of Songs
              <StatItemQuantity>{work.songCount}</StatItemQuantity>
            </StatItemName>
            <StatItemName>
              Number of Albums
              <StatItemQuantity>{work.albumCount}</StatItemQuantity>
            </StatItemName>
          </Box>
        </ArtistWork>
      ))}
    </>
  );
}
