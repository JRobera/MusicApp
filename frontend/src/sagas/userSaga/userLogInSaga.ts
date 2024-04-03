import { put, takeLatest } from "redux-saga/effects";
import {
  logInFailure,
  logInRequest,
  logInSuccess,
} from "../../features/user/userSlice";
import { logIn } from "../../api/user.api";
import { PayloadAction } from "@reduxjs/toolkit";

type ActionType = {
  email: string;
  password: string;
};

export function* watchLoginRequest() {
  yield takeLatest(logInRequest.type, loginSaga);
}

function* loginSaga(action: PayloadAction<ActionType>): Generator {
  try {
    const response = yield logIn(action.payload);
    yield put(logInSuccess(response));
  } catch (error) {
    yield put(logInFailure(error));
  }
}
