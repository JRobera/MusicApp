import styled from "@emotion/styled";
import { FormEvent, useRef, useState } from "react";
import { Flex, Heading } from "rebass";
import { Button } from "./styled/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  createPlaylistRequest,
  getPlaylistsStatus,
} from "../features/playlist/playlistSlice";
import { Spinner } from "./styled/Spinner";
import { FormItemsContainer } from "./styled/FormItemsContainer";
import { Input } from "./styled/Input";
import { currentUser } from "../features/user/userSlice";

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

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 60%;
  //   max-height: 90vh;
  @media (max-width: 576px) {
    width: 80%;
  }
`;

type CreatePlaylistProps = {
  handleToggle: () => void;
};

export default function CreatePlaylist({ handleToggle }: CreatePlaylistProps) {
  const dispatch = useDispatch();
  const getPlaylistStatus = useSelector(getPlaylistsStatus);
  const user = useSelector(currentUser);
  const overLayRef = useRef(null);
  const [newPlaylist, setNewPlaylist] = useState("");

  const handleOverLayClick = (event: React.MouseEvent) => {
    if (event.target === overLayRef.current) {
      handleToggle();
    }
  };
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (user) {
      dispatch(
        createPlaylistRequest({ userId: user._id, playlistName: newPlaylist })
      );
    }
    setNewPlaylist("");
  };
  return (
    <OverLay ref={overLayRef} onClick={handleOverLayClick}>
      <Container>
        <Heading fontFamily={"sans-serif"}>Create Playlist</Heading>
        <Form onSubmit={handleSubmit}>
          <FormItemsContainer>
            <Input
              type="text"
              required
              placeholder="Add playlist name..."
              value={newPlaylist}
              onChange={(event) => {
                setNewPlaylist(event.target.value);
              }}
            />
          </FormItemsContainer>
          <Flex justifyContent={"end"}>
            <Button
              disabled={getPlaylistStatus == "pending" ? true : false}
              width={"100px"}
              onClick={handleToggle}
            >
              Cancel
            </Button>
            <Button
              disabled={getPlaylistStatus == "pending" ? true : false}
              width={"100px"}
              bgColor="green"
              type="submit"
              //   onClick={handleToggle}
            >
              Create
              {getPlaylistStatus === "pending" && <Spinner />}
            </Button>
          </Flex>
        </Form>
      </Container>
    </OverLay>
  );
}
