import styled from "@emotion/styled";
import { Flex, Image } from "rebass";
import { song } from "../../tyepes";

const Detail = styled.div`
  display: flex;
  gap: 10px;
`;
const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;

  & span:nth-of-type(1) {
    font-size: 16px;
    font-weight: bold;
  }
  & span:last-child {
    font-size: 12px;
  }
`;

type MusicInfoProps = {
  className?: string;
  song: song;
};

export default function MusicInfo({ className, song }: MusicInfoProps) {
  return (
    <Detail className={className}>
      <Flex alignItems={"center"}>
        <Image
          src={song?.coverImage.imageUrl}
          alt="thumbnail"
          css={{ width: 30, height: 30, borderRadius: 4, aspectRatio: 1 }}
        />
      </Flex>
      <Info>
        <span>{song?.title}</span>
        <span>{song?.artist}</span>
      </Info>
    </Detail>
  );
}
