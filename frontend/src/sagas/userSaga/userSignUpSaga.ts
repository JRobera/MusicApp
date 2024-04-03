import { put, takeLatest } from "redux-saga/effects";
import { signUp } from "../../api/user.api";
import {
  signUpFailure,
  signUpRequest,
  signUpSuccess,
} from "../../features/user/userSlice";
import { PayloadAction } from "@reduxjs/toolkit";

type ActionType = {
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
};
export function* watchSignUpRequest() {
  yield takeLatest(signUpRequest.type, signUpSaga);
}

function* signUpSaga(action: PayloadAction<ActionType>): Generator {
  try {
    const response = yield signUp(action.payload);
    yield put(signUpSuccess(response));
  } catch (error) {
    yield put(signUpFailure(error));
  }
}
