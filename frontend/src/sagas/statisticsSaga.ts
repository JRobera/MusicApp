import { put, takeLatest } from "redux-saga/effects";
import {
  fetchCatCountFailure,
  fetchCatCountRequest,
  fetchCatCountSuccess,
} from "../features/statistics/categoryCountSlice";
import { fetchCategoryCount } from "../api/statistics.api";

export function* watchFetchCategoryCount() {
  yield takeLatest(fetchCatCountRequest.type, fetchCategoryCountSaga);
}

function* fetchCategoryCountSaga(): Generator {
  try {
    const response = yield fetchCategoryCount();
    yield put(fetchCatCountSuccess(response));
  } catch (error) {
    yield put(fetchCatCountFailure(error));
  }
}
