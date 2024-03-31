import styled from "@emotion/styled";
import { useRef, useState } from "react";
import { Flex, Heading } from "rebass";
import SongToBeAdded from "./SongToBeAdded";
import { useSelector } from "react-redux";
import { selectAllSongs } from "../features/songs/songSlice";
import { song } from "../tyepes";

const OverLay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  background-color: var(--secondary);
  padding: 20px 0;
  border-radius: 4px;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50%;
  //   max-height: 90vh;
  @media (max-width: 576px) {
    width: 80%;
  }
`;

type AddSongToPlaylistProps = {
  songsInPlaylist: song[];
  playlistId: string;
  handleToggle: () => void;
};

export default function AddSongToPlaylist({
  songsInPlaylist,
  playlistId,
  handleToggle,
}: AddSongToPlaylistProps) {
  const allSongs = useSelector(selectAllSongs);
  const overLayRef = useRef(null);

  const handleOverLayClick = (event: React.MouseEvent) => {
    if (event.target === overLayRef.current) {
      handleToggle();
    }
  };

  const checkIsAdded = (songId: string) => {
    const foundsong = songsInPlaylist.filter((item) => item._id === songId);
    if (foundsong.length === 0) {
      return false;
    } else {
      return true;
    }
  };

  return (
    <OverLay ref={overLayRef} onClick={handleOverLayClick}>
      <Container>
        <Heading fontFamily={"sans-serif"}>Add To Playlist</Heading>
        <Flex
          flexWrap={"wrap"}
          css={{
            width: "100%",
            minHeight: "10rem",
            // height: "15rem",
            overflowY: "auto",
            padding: "5px",
          }}
        >
          {allSongs?.map((song) => (
            <SongToBeAdded
              key={song._id}
              song={song}
              playlistId={playlistId}
              isAdded={checkIsAdded(song._id)}
            />
          ))}
        </Flex>
      </Container>
    </OverLay>
  );
}
