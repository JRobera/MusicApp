import { put, takeLatest } from "redux-saga/effects";
import {
  createPlaylistFailure,
  createPlaylistRequest,
  createPlaylistSuccess,
} from "../../features/playlist/playlistSlice";
import { createPlaylist } from "../../api/playlist.api";
import { PayloadAction } from "@reduxjs/toolkit";

type Cplaylist = {
  userId: string;
  playlistName: string;
};

export function* watchCreatePlaylist() {
  yield takeLatest(createPlaylistRequest.type, createPlaylistSaga);
}

function* createPlaylistSaga(action: PayloadAction<Cplaylist>): Generator {
  try {
    const response = yield createPlaylist(action.payload);
    yield put(createPlaylistSuccess(response));
  } catch (error) {
    yield put(createPlaylistFailure(error));
  }
}
