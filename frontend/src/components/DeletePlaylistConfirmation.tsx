import { useDispatch, useSelector } from "react-redux";
import { OverLay } from "./styled/Overlay";
import { Container } from "./styled/Container";
import { Flex, Heading, Text } from "rebass";
import { Button } from "./styled/Button";
import {
  deletePlaylistRequest,
  getPlaylistsStatus,
  resetStatus,
} from "../features/playlist/playlistSlice";
import { useEffect, useRef } from "react";
import { currentUser } from "../features/user/userSlice";
import { Spinner } from "./styled/Spinner";

type DeletePlaylistConfirmationProps = {
  playlistName: string;
  playlistId: string;
  handleToggle: () => void;
};

export default function DeletePlaylistConfirmation({
  playlistName,
  playlistId,
  handleToggle,
}: DeletePlaylistConfirmationProps) {
  const overLayRef = useRef(null);
  const dispatch = useDispatch();
  const getPlaylistStatus = useSelector(getPlaylistsStatus);
  const user = useSelector(currentUser);

  useEffect(() => {
    if (getPlaylistStatus === "succeeded") {
      handleToggle();
      dispatch(resetStatus());
    }
  }, [getPlaylistStatus]);

  function handleDelete() {
    if (user) {
      dispatch(deletePlaylistRequest({ userId: user._id, playlistId }));
    }
  }
  function handleOverLayClick(event: React.MouseEvent<HTMLDivElement>) {
    if (overLayRef?.current === event.target) {
      handleToggle();
    }
  }
  return (
    <OverLay ref={overLayRef} onClick={handleOverLayClick}>
      <Container>
        <Heading fontFamily={"sans-serif"}>Delete</Heading>
        <Text textAlign={"center"}>
          Are you sure you want to delete this playlist? This action cannot be
          undone.
        </Text>
        <Text textAlign={"center"} fontWeight={"bold"}>
          {playlistName} will be deleted.
        </Text>
        <Flex justifyContent={"space-between"} alignItems={"center"}>
          <Button width={"6rem"} onClick={handleToggle}>
            Cancel
          </Button>
          <Button bgColor="red" onClick={handleDelete} width={"6rem"}>
            Delete
            {getPlaylistStatus === "pending" && <Spinner />}
          </Button>
        </Flex>
      </Container>
    </OverLay>
  );
}
