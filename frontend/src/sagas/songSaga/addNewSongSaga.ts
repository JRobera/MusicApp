import { put, takeLatest } from "redux-saga/effects";
import {
  addSongFailure,
  addSongRequest,
  addSongSuccess,
} from "../../features/songs/songSlice";
import { addNewSong } from "../../api/song.api";
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
export function* watchAddNewSong() {
  yield takeLatest(addSongRequest.type, addNewSongSaga);
}
function* addNewSongSaga(action: PayloadAction<FormDataType>): Generator {
  try {
    const response = yield addNewSong(action.payload);
    yield put(addSongSuccess(response));
  } catch (error) {
    yield put(addSongFailure(error));
  }
}
