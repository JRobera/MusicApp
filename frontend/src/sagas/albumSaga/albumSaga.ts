import { call, put, takeLatest } from "redux-saga/effects";
import {
  fetchAlbumFailure,
  fetchAlbumRequest,
  fetchAlbumSuccess,
  resetStatus,
} from "../../features/albums/albumSlice";
import { fetchAlbums } from "../../api/album.api";

export default function* watchFetchAlbums() {
  yield takeLatest(fetchAlbumRequest.type, fetchAlbumsSaga);
}

function* fetchAlbumsSaga(): Generator {
  try {
    const response = yield call(fetchAlbums);
    yield put(fetchAlbumSuccess(response));
    yield put(resetStatus());
  } catch (error) {
    yield put(fetchAlbumFailure(error));
  }
}
