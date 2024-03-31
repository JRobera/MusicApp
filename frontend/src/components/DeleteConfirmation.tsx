import { Flex, Heading, Text } from "rebass";
import { song } from "../tyepes";
import { Button } from "./styled/Button";
import { useDispatch, useSelector } from "react-redux";
import { deleteSongRequest, getSongStatus } from "../features/songs/songSlice";
import { Spinner } from "./styled/Spinner";
import { Container } from "./styled/Container";

type DeleteConfirmationProps = { song: song; handleOverLayToggle: () => void };

export default function DeleteConfirmation({
  song,
  handleOverLayToggle,
}: DeleteConfirmationProps) {
  const dispatch = useDispatch();
  const songStatus = useSelector(getSongStatus);

  function handleDelete() {
    dispatch(deleteSongRequest(song._id));
  }

  return (
    <Container>
      <Heading fontFamily={"sans-serif"}>Delete</Heading>
      <Text textAlign={"center"}>
        Are you sure you want to delete this song? This action cannot be undone.
      </Text>
      <Text textAlign={"center"} fontWeight={"bold"}>
        {song.title} <Text fontWeight="lighter">by</Text> {song.artist} will be
        deleted.
      </Text>
      <Flex justifyContent={"space-between"} alignItems={"center"}>
        <Button width={"6rem"} onClick={() => handleOverLayToggle()}>
          Cancel
        </Button>
        <Button bgColor="red" onClick={handleDelete} width={"6rem"}>
          Delete
          {songStatus === "pending" && <Spinner />}
        </Button>
      </Flex>
    </Container>
  );
}
