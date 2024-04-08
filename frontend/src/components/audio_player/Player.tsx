import AudioPlayer, { RHAP_UI } from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

import styled from "@emotion/styled";
import { useEffect } from "react";
import MusicInfo from "./MusicInfo";
import { playlist } from "../../tyepes";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSongRequest,
  selectAllSongs,
} from "../../features/songs/songSlice";
import {
  currentTrackIndex,
  decreaseCurrentTrackIndex,
  getAllPlaylistItems,
  getIsPlaying,
  increaseCurrentTrackIndex,
  onTrackEnd,
  setCurrentTrackId,
  setIsPlaying,
} from "../../features/currentPlaylist/currentPlaylistSlice";

const PlayerContainer = styled.div`
  background-color: var(--bg-player);
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 15px;
`;

export default function Player() {
  const dispatch = useDispatch();
  const playlist: playlist = useSelector(getAllPlaylistItems);
  const isPlaying = useSelector(getIsPlaying);
  const allSongs: playlist = useSelector(selectAllSongs);
  const currentTrackIdx = useSelector(currentTrackIndex);

  let currentPlaylist = playlist;

  useEffect(() => {
    dispatch(fetchSongRequest());
  }, [dispatch]);

  if (playlist.length === 0) {
    currentPlaylist = allSongs;
  }
  useEffect(() => {
    dispatch(setCurrentTrackId(currentPlaylist[currentTrackIdx]?._id));
  }, [currentTrackIdx]);

  //#region

  const handleClickPrev = () => {
    dispatch(decreaseCurrentTrackIndex());
    dispatch(setIsPlaying(true));
  };
  const handleClickNext = () => {
    dispatch(increaseCurrentTrackIndex());
    dispatch(setIsPlaying(true));
  };
  const handleOnEnded = () => {
    dispatch(onTrackEnd());
    dispatch(setIsPlaying(true));
  };

  //#endregion

  return (
    <PlayerContainer>
      <AudioPlayer
        style={{
          backgroundColor: "var(--bg-player)",
        }}
        volume={0.2}
        autoPlayAfterSrcChange={isPlaying}
        header={
          currentPlaylist[currentTrackIdx] && (
            <MusicInfo song={currentPlaylist[currentTrackIdx]} />
          )
        }
        showSkipControls
        src={currentPlaylist[currentTrackIdx]?.song.songUrl}
        onClickPrevious={handleClickPrev}
        onClickNext={handleClickNext}
        onEnded={handleOnEnded}
        onPause={() => dispatch(setIsPlaying(false))}
        customProgressBarSection={[
          RHAP_UI.PROGRESS_BAR,
          RHAP_UI.CURRENT_TIME,
          <div>/</div>,
          RHAP_UI.DURATION,
        ]}
      />
    </PlayerContainer>
  );
}
