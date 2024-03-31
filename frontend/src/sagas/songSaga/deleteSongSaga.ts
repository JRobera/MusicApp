import { put, takeLatest } from "redux-saga/effects";
import { deleteSong } from "../../api/song.api";
import {
  deleteSongFailure,
  deleteSongRequest,
  deleteSongSuccess,
} from "../../features/songs/songSlice";
import { PayloadAction } from "@reduxjs/toolkit";

export function* watchDeleteSong() {
  yield takeLatest(deleteSongRequest.type, deleteSongSaga);
}
function* deleteSongSaga(action: PayloadAction<string>): Generator {
  try {
    const response = yield deleteSong(action.payload);
    yield put(deleteSongSuccess(response));
  } catch (error) {
    yield put(deleteSongFailure(error));
  }
}
