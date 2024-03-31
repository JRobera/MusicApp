import { put, takeLatest } from "redux-saga/effects";
import {
  fetchArtistFailuer,
  fetchArtistRequest,
  fetchArtistSuccess,
  resetStatus,
} from "../../features/artists/artistsSlice";
import { fetchArtists } from "../../api/artist.api";

export function* watchFetchArtists() {
  yield takeLatest(fetchArtistRequest.type, fetchArtistsSaga);
}

function* fetchArtistsSaga(): Generator {
  try {
    const response = yield fetchArtists();
    yield put(fetchArtistSuccess(response));
    yield put(resetStatus());
  } catch (error) {
    yield put(fetchArtistFailuer(error));
  }
}
