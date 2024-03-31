import { put, takeEvery } from "redux-saga/effects";
import {
  addSongToPlaylistFailure,
  addSongToPlaylistRequest,
  addSongToPlaylistSuccess,
  resetStatus,
} from "../../features/playlist/songsInPlaylistSlice";
import { addOrRemoveSongToPlaylist } from "../../api/playlist.api";
import { PayloadAction } from "@reduxjs/toolkit";

type AddPlaylistParams = {
  songId: string;
  playlistId: string;
};

export function* watchAddToPlaylist() {
  yield takeEvery(addSongToPlaylistRequest.type, addToPlaylistSaga);
}

//
function* addToPlaylistSaga(
  action: PayloadAction<AddPlaylistParams>
): Generator {
  try {
    const response = yield addOrRemoveSongToPlaylist(action.payload);
    yield put(addSongToPlaylistSuccess(response));
    yield put(resetStatus());
  } catch (error) {
    yield put(addSongToPlaylistFailure(error));
  }
}
