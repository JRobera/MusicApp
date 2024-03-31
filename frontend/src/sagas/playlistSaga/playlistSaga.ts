import { put, takeLatest } from "redux-saga/effects";
import {
  fetchPlaylistFailure,
  fetchPlaylistRequest,
  fetchPlaylistSuccess,
  resetStatus,
} from "../../features/playlist/playlistSlice";
import { fetchPlaylists } from "../../api/playlist.api";
import { PayloadAction } from "@reduxjs/toolkit";

export function* watchFetchPlaylist() {
  yield takeLatest(fetchPlaylistRequest.type, fetchPlaylistSaga);
}
function* fetchPlaylistSaga(action: PayloadAction<string>): Generator {
  try {
    const response = yield fetchPlaylists(action.payload);
    yield put(fetchPlaylistSuccess(response));
    yield put(resetStatus());
  } catch (error) {
    yield put(fetchPlaylistFailure(error));
  }
}
