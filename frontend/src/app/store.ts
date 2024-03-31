import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../sagas";
import songSlice from "../features/songs/songSlice";
import albumSlice from "../features/albums/albumSlice";
import currentPlaylistSlice from "../features/currentPlaylist/currentPlaylistSlice";
import songInAlbumSlice from "../features/albums/songInAlbumSlice";
import artistsSlice from "../features/artists/artistsSlice";
import artistSongSlice from "../features/artists/artistSongSlice";
import songCountInGenreSlice from "../features/genre/songCountInGenreSlice";
import categoryCountSlice from "../features/statistics/categoryCountSlice";
import artistsWorkSlice from "../features/statistics/artistsWorkSlice";
import genreSlice from "../features/genre/genreSlice";
import songsInGenreSlice from "../features/genre/songsInGenreSlice";
import userSlice from "../features/user/userSlice";
import playlistSlice from "../features/playlist/playlistSlice";
import songsInPlaylist from "../features/playlist/songsInPlaylistSlice";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    user: userSlice,
    songs: songSlice,
    albums: albumSlice,
    songsInAlbum: songInAlbumSlice,
    artists: artistsSlice,
    artistSongs: artistSongSlice,
    catCount: categoryCountSlice,
    songCountInGenre: songCountInGenreSlice,
    artistsWork: artistsWorkSlice,
    genres: genreSlice,
    songsInGenre: songsInGenreSlice,
    currentPlaylist: currentPlaylistSlice,
    userPlaylist: playlistSlice,
    songsInPlaylist: songsInPlaylist,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
