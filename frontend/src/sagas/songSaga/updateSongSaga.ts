import { put, takeLatest } from "redux-saga/effects";
import {
  updateSongFailure,
  updateSongRequest,
  updateSongSuccess,
} from "../../features/songs/songSlice";
import { updateSong } from "../../api/song.api";
import { PayloadAction } from "@reduxjs/toolkit";

type FormDataType = {
  id?: string;
  title: string;
  artist: string;
  album: string;
  genre: string;
  coverImage?: File | null;
  newSong?: File | null;
};

export function* watchEditSong() {
  yield takeLatest(updateSongRequest.type, updateSongSaga);
}

function* updateSongSaga(action: PayloadAction<FormDataType>): Generator {
  try {
    const response = yield updateSong(action.payload);
    yield put(updateSongSuccess(response));
  } catch (error) {
    yield put(updateSongFailure(error));
  }
}
