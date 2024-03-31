import { put, takeLatest } from "redux-saga/effects";
import {
  fetchArtistsWorkFailure,
  fetchArtistsWorkRequest,
  fetchArtistsWorkSuccess,
} from "../../features/statistics/artistsWorkSlice";
import { fetchArtistsWork } from "../../api/statistics.api";

export function* watchFetchArtistsWork() {
  yield takeLatest(fetchArtistsWorkRequest.type, fetchArtistsWorkSaga);
}

function* fetchArtistsWorkSaga(): Generator {
  try {
    const response = yield fetchArtistsWork();
    yield put(fetchArtistsWorkSuccess(response));
  } catch (error) {
    yield put(fetchArtistsWorkFailure(error));
  }
}
