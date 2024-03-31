import { put, takeLatest } from "redux-saga/effects";
import { fetchPlaylist } from "../../api/playlist.api";
import {
  fetchSongsInPlaylistFailure,
  fetchSongsInPlaylistRequest,
  fetchSongsInPlaylistSuccess,
  resetStatus,
} from "../../features/playlist/songsInPlaylistSlice";
import { PayloadAction } from "@reduxjs/toolkit";

export function* watchFetchSongsInPlaylist() {
  yield takeLatest(fetchSongsInPlaylistRequest.type, fetchSongsInPlaylistSaga);
}
function* fetchSongsInPlaylistSaga(action: PayloadAction<string>): Generator {
  try {
    const response = yield fetchPlaylist(action.payload);
    yield put(fetchSongsInPlaylistSuccess(response));
    yield put(resetStatus());
  } catch (error) {
    yield put(fetchSongsInPlaylistFailure(error));
  }
}
