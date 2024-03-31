import styled from "@emotion/styled";
import { song } from "../tyepes";
import { useMultistepForm } from "../hooks/useMultistepForm";
import { Spinner } from "./styled/Spinner";
import { Button } from "./styled/Button";
import { Flex } from "rebass";
import { useDispatch, useSelector } from "react-redux";
import { getSongStatus, updateSongRequest } from "../features/songs/songSlice";
import { FormEvent, useState } from "react";
import AddSongDetail from "./add_song_form/AddSongDetail";
import AddSong from "./add_song_form/AddSong";
import AddSongCoverImage from "./add_song_form/AddSongCoverImage";
import { Container } from "./styled/Container";
import { Form } from "./styled/Form";

const StepCounter = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
`;

type EditFormProps = {
  song: song;
};

type FormDataType = {
  title: string;
  artist: string;
  album: string;
  genre: string;
  newSong: File | "";
  coverImage: File | "";
};

export default function EditForm({ song }: EditFormProps) {
  const initialState: FormDataType = {
    title: song.title,
    artist: song.artist,
    album: song.album,
    genre: song.genre,
    newSong: "",
    coverImage: "",
  };
  const dispatch = useDispatch();
  const songStatus = useSelector(getSongStatus);
  const [data, setData] = useState(initialState);
  function updateFields(fields: Partial<FormDataType>) {
    setData((prev) => {
      return { ...prev, ...fields };
    });
  }
  const {
    currentStepIndex,
    steps,
    step,
    previousStep,
    nextStep,
    isFirst,
    isLast,
  } = useMultistepForm([
    <AddSongDetail {...data} updateFields={updateFields} />,
    <AddSong {...data} updateFields={updateFields} />,
    <AddSongCoverImage {...data} updateFields={updateFields} />,
  ]);
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isLast) return nextStep();
    const formData = new FormData();
    formData.append("id", song._id);
    formData.append("title", data.title);
    formData.append("artist", data.artist);
    formData.append("album", data.album);
    formData.append("genre", data.genre);
    formData.append("newSong", data.newSong);
    formData.append("coverImage", data.coverImage);
    dispatch(updateSongRequest(formData));
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <StepCounter>
          {currentStepIndex + 1} / {steps.length}
        </StepCounter>

        {step}

        <Flex justifyContent={"end"}>
          {isFirst && (
            <Button
              disabled={songStatus == "pending" ? true : false}
              width={"100px"}
              type="button"
              onClick={previousStep}
            >
              Back
            </Button>
          )}
          <Button
            disabled={songStatus == "pending" ? true : false}
            type="submit"
            width={"100px"}
          >
            {isLast ? "Finish" : "Next"}
            {songStatus === "pending" && <Spinner />}
          </Button>
        </Flex>
      </Form>
    </Container>
  );
}
