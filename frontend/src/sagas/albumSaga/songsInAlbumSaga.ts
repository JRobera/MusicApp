import { put, takeLatest } from "redux-saga/effects";
import {
  fetchSongsInAlbumFailure,
  fetchSongsInAlbumRequest,
  fetchSongsInAlbumSuccess,
  resetStatus,
} from "../../features/albums/songInAlbumSlice";
import { fetchSongsInAlbum } from "../../api/album.api";
import { PayloadAction } from "@reduxjs/toolkit";

export function* watchFetchSongsInAlbum() {
  yield takeLatest(fetchSongsInAlbumRequest.type, fetchSongsInAlbumSaga);
}

function* fetchSongsInAlbumSaga(action: PayloadAction<string>): Generator {
  try {
    const response = yield fetchSongsInAlbum(action.payload);
    yield put(fetchSongsInAlbumSuccess(response));
    yield put(resetStatus());
  } catch (error) {
    yield put(fetchSongsInAlbumFailure(error));
  }
}
