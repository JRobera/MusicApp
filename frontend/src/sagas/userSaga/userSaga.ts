import { put, takeLatest } from "redux-saga/effects";
import {
  resetStatus,
  setUserFailure,
  setUserRequest,
  setUserSuccess,
} from "../../features/user/userSlice";
import { isUserAuthenticated } from "../../api/user.api";

export function* watchSetUserRequest() {
  yield takeLatest(setUserRequest.type, setUserSaga);
}

function* setUserSaga(): Generator {
  try {
    const response = yield isUserAuthenticated();
    yield put(setUserSuccess(response));
  } catch (error) {
    yield put(setUserFailure(error));
  } finally {
    yield put(resetStatus());
  }
}
