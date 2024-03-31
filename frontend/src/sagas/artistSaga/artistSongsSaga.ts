import { put, takeLatest } from "redux-saga/effects";
import {
  fetchArtistSongsFailure,
  fetchArtistSongsRequest,
  fetchArtistSongsSuccess,
  resetStatus,
} from "../../features/artists/artistSongSlice";
import { fetchArtistSongs } from "../../api/artist.api";
import { PayloadAction } from "@reduxjs/toolkit";

export function* watchFetchArtistSongs() {
  yield takeLatest(fetchArtistSongsRequest.type, fetchArtistSongsSaga);
}

function* fetchArtistSongsSaga(action: PayloadAction<string>): Generator {
  try {
    const response = yield fetchArtistSongs(action.payload);
    yield put(fetchArtistSongsSuccess(response));
    yield put(resetStatus());
  } catch (error) {
    yield put(fetchArtistSongsFailure(error));
  }
}
