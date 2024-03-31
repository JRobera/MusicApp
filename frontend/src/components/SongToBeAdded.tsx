import styled from "@emotion/styled";
import { useDispatch } from "react-redux";
import { Box, Text } from "rebass";
import { addSongToPlaylistRequest } from "../features/playlist/songsInPlaylistSlice";
import { song } from "../tyepes";
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";

const SongToBeAddedWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 2px;
  padding: 5px;
  width: 100%;
  height: 60px;
  border-radius: 4px;
  background-color: var(--primary);
  align-items: center;
  &:hover {
    background-color: var(--secondary);
  }
`;

const SongInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const ActionBtn = styled.button`
  padding: 2px;
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

type SongToBeAddedProps = {
  song: song;
  playlistId: string;
  isAdded: boolean;
};

export default function SongToBeAdded({
  song,
  playlistId,
  isAdded,
}: SongToBeAddedProps) {
  const dispatch = useDispatch();
  const handleAddClick = () => {
    dispatch(
      addSongToPlaylistRequest({ songId: song._id, playlistId: playlistId })
    );
  };

  return (
    <SongToBeAddedWrapper>
      <SongInfo>
        <Text>{song.title}</Text>
        <Text>{song.artist}</Text>
      </SongInfo>
      <Box>
        <ActionBtn onClick={handleAddClick}>
          {isAdded ? (
            <IoRemoveCircleOutline size={25} />
          ) : (
            <IoAddCircleOutline size={25} />
          )}
        </ActionBtn>
      </Box>
    </SongToBeAddedWrapper>
  );
}
