import { useEffect, useState } from "react";
import { MainContainer } from "../components/styled/MainContainer";
import Search from "../components/Search";
import { Button } from "../components/styled/Button";
import { Flex, Heading } from "rebass";
import styled from "@emotion/styled";

import { useDispatch, useSelector } from "react-redux";
import {
  fetchPlaylistRequest,
  getPlaylistsStatus,
  getuserPlaylists,
  resetStatus,
} from "../features/playlist/playlistSlice";
import { currentUser } from "../features/user/userSlice";
import Playlist from "../components/Playlist";
import CreatePlaylist from "../components/CreatePlaylist";
import { useSearchFilter } from "../hooks/useSearchFilter";

const PlaylistContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  overflow: auto;
  max-height: 330px !important;
`;

type Props = {};

export default function Playlists({}: Props) {
  const user = useSelector(currentUser);
  const dispatch = useDispatch();
  const usersplaylists = useSelector(getuserPlaylists);
  const usersplaylistsStatus = useSelector(getPlaylistsStatus);
  const [isOpen, setIsOpen] = useState(false);
  const { currentList: playlists } = useSearchFilter(
    usersplaylists,
    "playlist"
  );

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (usersplaylistsStatus === "succeeded") {
      if (isOpen) {
        handleToggle();
        dispatch(resetStatus());
      }
    }
  }, [usersplaylistsStatus]);

  useEffect(() => {
    if (user) {
      dispatch(fetchPlaylistRequest(user._id));
    }
  }, [user]);

  return (
    <MainContainer>
      <Flex
        justifyContent={"space-between"}
        alignItems="center"
        css={{
          backgroundColor: "var(--secondary)",
          padding: "2px",
          borderRadius: "5px",
        }}
      >
        <Search placeholder="Search for a playlist..." />
        <Button margin="0" onClick={handleToggle}>
          Create Playlist
        </Button>
      </Flex>
      <Heading fontSize="3" fontFamily="sans-serif">
        Playlist
      </Heading>
      <PlaylistContainer>
        {playlists.map((playlistItem) => (
          <Playlist key={playlistItem._id} list={playlistItem} />
        ))}
      </PlaylistContainer>
      {isOpen && <CreatePlaylist handleToggle={handleToggle} />}
    </MainContainer>
  );
}
