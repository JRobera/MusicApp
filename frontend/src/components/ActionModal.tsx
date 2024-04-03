import { useEffect, useRef } from "react";
import { song } from "../tyepes";
import DeleteConfirmation from "./DeleteConfirmation";
import EditForm from "./EditForm";
import { useDispatch, useSelector } from "react-redux";
import {
  getSongStatus,
  getSongerror,
  resetStatus,
} from "../features/songs/songSlice";
import { OverLay } from "./styled/Overlay";
import { generateError } from "../util/toast";

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
  const songError = useSelector(getSongerror);

  const overLayRef = useRef(null);
  const handleOverLayClick = (event: React.MouseEvent) => {
    if (event.target === overLayRef.current) {
      handleOverLayToggle();
    }
  };
  useEffect(() => {
    if (songError !== null) {
      generateError(songError);
      dispatch(resetStatus());
    }
  }, [songError]);

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
