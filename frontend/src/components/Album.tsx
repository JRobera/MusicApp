import styled from "@emotion/styled";
import { Flex, Image, Text } from "rebass";
import { Link } from "react-router-dom";

const AlbumInfo = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.7);
  text-align: center;
  width: 100%;
  height: 100%;
  //   padding: 1.5rem;
  & > div :nth-of-type(1) {
    font-size: 20px;
    font-weight: bold;
  }
  & > div :nth-of-type(2),
  div :last-child {
    font-size: 12px;
  }
`;

const AlbumItem = styled.div`
  position: relative;
  background-color: var(--secondary);
  flex: 1;
  min-width: 10rem;
  max-width: 12rem;
  max-height: 6.5rem;
  border-radius: 4px;
  overflow: hidden;
  padding: 8px;
  @media (max-width: 390px) {
    max-width: 100%;
  }
`;

type AlbumProps = {
  data: { artist: string; albumTitle: string; songCount: number };
};

export default function Album({
  data: { artist, albumTitle, songCount },
}: AlbumProps) {
  return (
    <AlbumItem>
      <Link to={albumTitle}>
        <Image
          src="https://res.cloudinary.com/dbv6hao81/image/upload/v1711718939/player/public/albmW_l4ugaw.jpg"
          alt="Album"
          css={{ width: "100%", height: "100%" }}
        />
        <AlbumInfo>
          <Flex
            flexDirection={"column"}
            css={{
              transform: "translate(-50%, -50%)",
              position: "relative",
              left: "50%",
              top: "50%",
              gap: "5px",
            }}
          >
            <Text>{albumTitle}</Text>
            <Text>{artist}</Text>
            <Text>{songCount}</Text>
          </Flex>
        </AlbumInfo>
      </Link>
    </AlbumItem>
  );
}
