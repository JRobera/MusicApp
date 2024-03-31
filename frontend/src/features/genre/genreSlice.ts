import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

type genre = { genre: string; songCount: number };

type genreType = {
  status: "idle" | "pending" | "succeeded" | "failed";
  error: string | null;
  genres: genre[];
};

const initialState: genreType = {
  status: "idle",
  error: null,
  genres: [],
};

const genreSlice = createSlice({
  name: "genres",
  initialState,
  reducers: {
    fetchGenresRequest: (state) => {
      state.status = "pending";
      state.error = null;
    },
    fetchGenresSuccess: (state, action) => {
      state.status = "succeeded";
      state.genres = action.payload.data;
    },
    fetchGenresFailure: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
  },
});

export const getallGenres = (state: RootState) => state.genres.genres;

export const { fetchGenresRequest, fetchGenresSuccess, fetchGenresFailure } =
  genreSlice.actions;

export default genreSlice.reducer;
