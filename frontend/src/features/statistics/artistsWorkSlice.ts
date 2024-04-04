import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

type artistsWorkType = {
  artistName: string;
  songCount: number;
  albumCount: number;
};
type stateType = {
  status: "idle" | "pending" | "succeeded" | "failed";
  error: null;
  data: artistsWorkType[];
};

const initialState: stateType = {
  status: "idle",
  error: null,
  data: [],
};

const artistsWorkSlice = createSlice({
  name: "artistsWork",
  initialState,
  reducers: {
    fetchArtistsWorkRequest: (state) => {
      state.status = "pending";
      state.error = null;
    },
    fetchArtistsWorkSuccess: (state, action) => {
      state.status = "succeeded";
      state.data = action.payload.data;
    },
    fetchArtistsWorkFailure: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
  },
});

export const getAllArtistsWork = (state: RootState) => state.artistsWork.data;
export const getArtistsWorkStatus = (state: RootState) =>
  state.artistsWork.status;

export const {
  fetchArtistsWorkRequest,
  fetchArtistsWorkSuccess,
  fetchArtistsWorkFailure,
} = artistsWorkSlice.actions;

export default artistsWorkSlice.reducer;
