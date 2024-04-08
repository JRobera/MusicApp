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
import { OverLay } from "./styled/Overlay";
import { Container } from "./styled/Container";
import { Form } from "./styled/Form";

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
        <Form
          onSubmit={handleSubmit}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              handleSubmit(event);
            }
          }}
        >
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
