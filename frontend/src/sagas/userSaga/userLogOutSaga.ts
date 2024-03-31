import { put, takeLatest } from "redux-saga/effects";
import {
  logOutFailure,
  logOutRequest,
  logOutSuccess,
  resetStatus,
} from "../../features/user/userSlice";
import { logOut } from "../../api/user.api";

export function* watchLogOutRequest() {
  yield takeLatest(logOutRequest.type, logOutSaga);
}

function* logOutSaga(): Generator {
  try {
    const response = yield logOut();
    yield put(logOutSuccess(response));
    yield put(resetStatus());
  } catch (error) {
    yield put(logOutFailure(error));
  }
}
