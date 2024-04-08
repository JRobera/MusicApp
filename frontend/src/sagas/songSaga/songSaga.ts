import { put, takeLatest } from "redux-saga/effects";
import {
  fetchSongFailure,
  fetchSongRequest,
  fetchSongSuccess,
  resetStatus,
} from "../../features/songs/songSlice";
import { fetchSongs } from "../../api/song.api";

export default function* watchFetchSongs() {
  yield takeLatest(fetchSongRequest.type, fetchSongsSaga);
}
function* fetchSongsSaga(): Generator {
  try {
    const response = yield fetchSongs();
    yield put(fetchSongSuccess(response));
  } catch (error) {
    yield put(fetchSongFailure(error));
  } finally {
    yield put(resetStatus());
  }
}
