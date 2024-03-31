import styled from "@emotion/styled";
import { FormEvent, useRef, useState } from "react";
import { Flex } from "rebass";

import { useDispatch, useSelector } from "react-redux";
import { addSongRequest, getSongStatus } from "../features/songs/songSlice";
import { useMultistepForm } from "../hooks/useMultistepForm";
import AddSongDetail from "./add_song_form/AddSongDetail";
import AddSong from "./add_song_form/AddSong";
import AddSongCoverImage from "./add_song_form/AddSongCoverImage";
import { Button } from "./styled/Button";
import { Spinner } from "./styled/Spinner";
import { OverLay } from "./styled/Overlay";
import { Container } from "./styled/Container";
import { Form } from "./styled/Form";

const StepCounter = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
`;
type AddNewSongProps = {
  handleToggle: () => void;
};

type FormDataType = {
  title: string;
  artist: string;
  album: string;
  genre: string;
  newSong: File | "";
  coverImage: File | "";
};

const initialState: FormDataType = {
  title: "",
  artist: "",
  album: "",
  genre: "",
  newSong: "",
  coverImage: "",
};

export default function AddNewSong({ handleToggle }: AddNewSongProps) {
  const dispatch = useDispatch();
  const songStatus = useSelector(getSongStatus);
  const overLayRef = useRef(null);
  const [data, setData] = useState(initialState);
  function updateFields(fields: Partial<FormDataType>) {
    setData((prev) => {
      return { ...prev, ...fields };
    });
  }
  const {
    step,
    steps,
    currentStepIndex,
    isFirst,
    isLast,
    nextStep,
    previousStep,
  } = useMultistepForm([
    <AddSongDetail {...data} updateFields={updateFields} />,
    <AddSong {...data} updateFields={updateFields} />,
    <AddSongCoverImage {...data} updateFields={updateFields} />,
  ]);

  const handleOverLayClick = (event: React.MouseEvent) => {
    if (event.target === overLayRef.current) {
      handleToggle();
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isLast) return nextStep();
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("artist", data.artist);
    formData.append("album", data.album);
    formData.append("genre", data.genre);
    formData.append("newSong", data.newSong);
    formData.append("coverImage", data.coverImage);
    dispatch(addSongRequest(formData));
    setData(initialState);
  };

  return (
    <OverLay ref={overLayRef} onClick={handleOverLayClick}>
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
    </OverLay>
  );
}
