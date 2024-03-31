import { put, takeEvery } from "redux-saga/effects";
import {
  fetchSongCountInGenreFailure,
  fetchSongCountInGenreRequest,
  fetchSongCountInGenreSuccess,
} from "../../features/genre/songCountInGenreSlice";
import { fetchSongCountInGenre } from "../../api/genre.api";

export function* watchFetchSongCountInGenre() {
  yield takeEvery(fetchSongCountInGenreRequest.type, fetchSongCountInGenreSaga);
}

function* fetchSongCountInGenreSaga(): Generator {
  try {
    const response = yield fetchSongCountInGenre();
    yield put(fetchSongCountInGenreSuccess(response));
  } catch (error) {
    yield put(fetchSongCountInGenreFailure(error));
  }
}
