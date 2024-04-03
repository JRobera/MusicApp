import styled from "@emotion/styled";
import { Outlet, useOutletContext } from "react-router-dom";
import SideBar from "../components/SideBar";
import { Flex } from "rebass";
import Player from "../components/audio_player/Player";
import AddNewSong from "../components/AddNewSong";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSongStatus, resetStatus } from "../features/songs/songSlice";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  height: 100dvh;
`;

type ContextType = { handleToggle: () => void };

export default function RootLayout() {
  const dispatch = useDispatch();
  const songStatus = useSelector(getSongStatus);
  const [isOpen, setIsOpen] = useState(false);
  const handleToggle = () => {
    setIsOpen((previous) => !previous);
  };

  useEffect(() => {
    if (songStatus === "succeeded") {
      if (isOpen) {
        handleToggle();
        dispatch(resetStatus());
      }
    }
  }, [songStatus]);

  return (
    <Wrapper>
      <Flex flex={1} css={{ overflowY: "auto" }}>
        <SideBar />
        <Outlet context={{ handleToggle }} />
      </Flex>
      <Player />
      {isOpen && <AddNewSong handleToggle={handleToggle} />}
    </Wrapper>
  );
}
export function useIsOpen() {
  return useOutletContext<ContextType>();
}
