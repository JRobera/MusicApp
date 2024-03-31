import styled from "@emotion/styled";
import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { Box, Flex, Heading } from "rebass";

import { useDispatch, useSelector } from "react-redux";
import { addSongRequest, getSongStatus } from "../features/songs/songSlice";
import { useMultistepForm } from "../hooks/useMultistepForm";
import AddSongDetail from "./add_song_form/AddSongDetail";
import AddSong from "./add_song_form/AddSong";
import AddSongCoverImage from "./add_song_form/AddSongCoverImage";
import { Button } from "./styled/Button";
import { Spinner } from "./styled/Spinner";

const OverLay = styled.div`
  position: absolute;
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
