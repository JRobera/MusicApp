import { put, takeLatest } from "redux-saga/effects";
import {
  reOrderPlaylistFailure,
  reOrderPlaylistRequest,
  reOrderPlaylistSuccess,
  resetStatus,
} from "../../features/playlist/songsInPlaylistSlice";
import { song } from "../../tyepes";
import { PayloadAction } from "@reduxjs/toolkit";
import { updatePlaylistOrder } from "../../api/playlist.api";

type ActionType = {
  newList: song[];
  playlistId: string;
};

export function* watchUpdatePlaylistOreder() {
  yield takeLatest(reOrderPlaylistRequest.type, updatePlaylistOrderSaga);
}

function* updatePlaylistOrderSaga(
  action: PayloadAction<ActionType>
): Generator {
  try {
    const { newList, playlistId } = action.payload;
    const newPlaylistOrder = newList.map((item: song) => item._id);
    const response = yield updatePlaylistOrder({
      newPlaylistOrder,
      playlistId,
    });
    yield put(reOrderPlaylistSuccess(response));
  } catch (error) {
    yield put(reOrderPlaylistFailure(error));
  } finally {
    yield put(resetStatus());
  }
}
