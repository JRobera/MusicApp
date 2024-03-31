import { put, takeLatest } from "redux-saga/effects";
import {
  fetchSongsInGenreFailure,
  fetchSongsInGenreRequest,
  fetchSongsInGenreSuccess,
} from "../../features/genre/songsInGenreSlice";
import { fetchSongsInGenre } from "../../api/genre.api";
import { PayloadAction } from "@reduxjs/toolkit";

export function* watchFetchSongsInGenre() {
  yield takeLatest(fetchSongsInGenreRequest.type, fetchSongsInGenreSaga);
}

function* fetchSongsInGenreSaga(action: PayloadAction<string>): Generator {
  try {
    const response = yield fetchSongsInGenre(action.payload);
    yield put(fetchSongsInGenreSuccess(response));
  } catch (error) {
    yield put(fetchSongsInGenreFailure(error));
  }
}
