import { put, takeLatest } from "redux-saga/effects";
import {
  fetchGenresFailure,
  fetchGenresRequest,
  fetchGenresSuccess,
} from "../../features/genre/genreSlice";
import { fetchAllGenres } from "../../api/genre.api";

export function* watchFetchGenres() {
  yield takeLatest(fetchGenresRequest.type, fetchGenresSaga);
}

function* fetchGenresSaga(): Generator {
  try {
    const response = yield fetchAllGenres();
    yield put(fetchGenresSuccess(response));
  } catch (error) {
    yield put(fetchGenresFailure(error));
  }
}
