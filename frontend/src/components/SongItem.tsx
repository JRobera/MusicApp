import styled from "@emotion/styled";
import { Flex } from "rebass";
import MusicInfo from "./audio_player/MusicInfo";
import { song } from "../tyepes";
import { Button } from "./styled/Button";
import { IoMdMore } from "react-icons/io";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectAllSongs } from "../features/songs/songSlice";
import {
  setCurrentPlaylist,
  setIsPlaying,
} from "../features/currentPlaylist/currentPlaylistSlice";
import { getAllSongsInAlbum } from "../features/albums/songInAlbumSlice";
import { getArtistSongs } from "../features/artists/artistSongSlice";
import formateTime from "../util/formatTime";
import { useRef, useState } from "react";
import { getAllSongsInGenre } from "../features/genre/songsInGenreSlice";
import MoreOptions from "./MoreOptions";
import ActionModal from "./ActionModal";
import { getAllSongsInPlaylist } from "../features/playlist/songsInPlaylistSlice";

const SongContainer = styled.div`
  display: flex;
  border-radius: 5px;
  // overflow: hidden;
  margin-bottom: 3px;
  box-shadow: var(--secondary) 0px 0px 4px;
  cursor: pointer;

  &:hover {
    background-color: var(--secondary);
  }
`;

interface SongItemProps {
  song: song;
}
type action = "Edit" | "Delete" | "";
const initiaActionState: action = "";
export default function SongItem({ song }: SongItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [actionType, setActionType] = useState(initiaActionState);
  const location = useLocation();

  const dispatch = useDispatch();
  const allSongs = useSelector(selectAllSongs);
  const songsInAlbum = useSelector(getAllSongsInAlbum);
  const artistSongs = useSelector(getArtistSongs);
  const songsInGenre = useSelector(getAllSongsInGenre);
  const songsInPlaylist = useSelector(getAllSongsInPlaylist);
  const timeRef = useRef<HTMLAudioElement>(null);
  const [duration, setDuration] = useState<number | null>(null);

  const handleLoadedMetadata = () => {
    if (timeRef.current) {
      setDuration(timeRef.current.duration);
    }
  };

  // onClick find index of song and play
  const handleClickPlay = () => {
    const path = location.pathname.split("/");

    if (path[2] === "song") {
      dispatch(setCurrentPlaylist({ data: allSongs, trackId: song._id }));
    } else if (path[2] === "album") {
      dispatch(setCurrentPlaylist({ data: songsInAlbum, trackId: song._id }));
    } else if (path[2] === "artist") {
      dispatch(setCurrentPlaylist({ data: artistSongs, trackId: song._id }));
    } else if (path[2] === "genre") {
      dispatch(setCurrentPlaylist({ data: songsInGenre, trackId: song._id }));
    } else if (path[2] === "playlist") {
      dispatch(
        setCurrentPlaylist({ data: songsInPlaylist, trackId: song._id })
      );
    }
    dispatch(setIsPlaying(true));
  };
  // toggle options menu
  const handleToggleOptions = () => {
    setIsOpen((prev) => !prev);
  };
  const handleOverLayToggle = (action: action = "") => {
    setActionType(action);
  };
  const optionsProps = {
    song_id: song._id,
    handleToggleOptions,
    handleOverLayToggle,
  };
  const actionModalProps = { actionType, song, handleOverLayToggle };

  return (
    <SongContainer>
      <Flex css={{ flex: "1" }} onClick={handleClickPlay}>
        <MusicInfo song={song} />
      </Flex>
      <Flex alignItems={"center"} css={{ gap: "15px" }}>
        <audio
          onLoadedMetadata={handleLoadedMetadata}
          hidden
          src={song.song.songUrl}
          ref={timeRef}
        />
        <span>{formateTime(Number(duration))}</span>
        <Button onClick={handleToggleOptions} name="More" position="relative">
          <IoMdMore size={20} />
          {isOpen && <MoreOptions {...optionsProps} />}
        </Button>
      </Flex>
      {actionType && <ActionModal {...actionModalProps} />}
    </SongContainer>
  );
}
