import styled from "@emotion/styled";
import { useEffect, useRef } from "react";
import { song } from "../tyepes";
import DeleteConfirmation from "./DeleteConfirmation";
import EditForm from "./EditForm";
import { useDispatch, useSelector } from "react-redux";
import { getSongStatus, resetStatus } from "../features/songs/songSlice";

const OverLay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 5;
`;
type action = "Edit" | "Delete" | "";

type ActionModalProps = {
  actionType: action;
  song: song;
  handleOverLayToggle: () => void;
};

export default function ActionModal({
  actionType,
  song,
  handleOverLayToggle,
}: ActionModalProps) {
  const dispatch = useDispatch();
  const songStatus = useSelector(getSongStatus);
  const overLayRef = useRef(null);
  const handleOverLayClick = (event: React.MouseEvent) => {
    if (event.target === overLayRef.current) {
      handleOverLayToggle();
    }
  };
  useEffect(() => {
    if (songStatus === "succeeded") {
      handleOverLayToggle();
      dispatch(resetStatus());
    }
  }, [songStatus]);
  return (
    <OverLay ref={overLayRef} onClick={handleOverLayClick}>
      {actionType === "Edit" ? (
        <EditForm song={song} />
      ) : (
        <DeleteConfirmation
          song={song}
          handleOverLayToggle={handleOverLayToggle}
        />
      )}
    </OverLay>
  );
}
