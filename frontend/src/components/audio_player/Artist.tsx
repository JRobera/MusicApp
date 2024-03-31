import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { Image, Text } from "rebass";
import { artist } from "../../tyepes";

const ArtistInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  padding: 4px 2px;
  flex: 1;

  & :nth-of-type(1) {
    font-size: 15px;
    font-weight: bold;
  }
  & :last-child {
    font-size: 12px;
  }
`;

const ArtistItem = styled.div`
  background-color: var(--secondary);
  flex: 1;
  min-width: 10rem;
  max-width: 13rem;
  max-height: 6rem;
  border-radius: 4px;
  padding: 8px;
  @media (max-width: 395px) {
    max-width: 100%;
  }
`;

type AritstProps = {
  artist: artist;
};

export default function Artist({
  artist: { artist, songCount, coverImage },
}: AritstProps) {
  return (
    <ArtistItem>
      <Link to={artist} style={{ display: "flex", height: "100%" }}>
        <Image
          src={coverImage.imageUrl}
          alt="artist image"
          css={{ flex: 1, borderRadius: 4, height: "100%" }}
        />
        <ArtistInfo>
          <Text>{artist}</Text>
          <Text>{songCount}</Text>
        </ArtistInfo>
      </Link>
    </ArtistItem>
  );
}
