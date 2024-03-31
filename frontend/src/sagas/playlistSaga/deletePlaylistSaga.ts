import { put, takeLatest } from "redux-saga/effects";
import {
  deletePlaylistFailure,
  deletePlaylistRequest,
  deletePlaylistSuccess,
} from "../../features/playlist/playlistSlice";
import { deletePlaylist } from "../../api/playlist.api";
import { PayloadAction } from "@reduxjs/toolkit";

type DeletePlaylistParams = {
  userId: string;
  playlistId: string;
};

export function* watchDeletePlaylist() {
  yield takeLatest(deletePlaylistRequest.type, deletePlaylistSaga);
}

function* deletePlaylistSaga(
  action: PayloadAction<DeletePlaylistParams>
): Generator {
  try {
    const response = yield deletePlaylist(action.payload);
    yield put(deletePlaylistSuccess(response));
  } catch (error) {
    yield put(deletePlaylistFailure(error));
  }
}
