import { all } from "redux-saga/effects";
import watchFetchSongs from "./songSaga/songSaga";
import watchFetchAlbums from "./albumSaga/albumSaga";
import { watchFetchSongsInAlbum } from "./albumSaga/songsInAlbumSaga";
import { watchFetchArtists } from "./artistSaga/artistSaga";
import { watchFetchArtistSongs } from "./artistSaga/artistSongsSaga";
import { watchFetchSongCountInGenre } from "./genreSaga/songCountInGenreSaga";
import { watchFetchCategoryCount } from "./statisticsSaga";
import { watchFetchArtistsWork } from "./artistSaga/artistsWorkSaga";
import { watchAddNewSong } from "./songSaga/addNewSongSaga";
import { watchFetchGenres } from "./genreSaga/genreSaga";
import { watchFetchSongsInGenre } from "./genreSaga/songInGenreSaga";
import { watchEditSong } from "./songSaga/updateSongSaga";
import { watchDeleteSong } from "./songSaga/deleteSongSaga";
import { watchSetUserRequest } from "./userSaga/userSaga";
import { watchLogOutRequest } from "./userSaga/userLogOutSaga";
import { watchFetchPlaylist } from "./playlistSaga/playlistSaga";
import { watchFetchSongsInPlaylist } from "./playlistSaga/songsInPlaylistSaga";
import { watchCreatePlaylist } from "./playlistSaga/createPlaylistSaga";
import { watchAddToPlaylist } from "./playlistSaga/addToPlaylistSaga";
import { watchDeletePlaylist } from "./playlistSaga/deletePlaylistSaga";
import { watchLoginRequest } from "./userSaga/userLogInSaga";
import { watchSignUpRequest } from "./userSaga/userSignUpSaga";

function* rootSaga() {
  yield all([
    watchSignUpRequest(),
    watchLoginRequest(),
    watchSetUserRequest(),
    watchLogOutRequest(),
    watchFetchSongs(),
    watchFetchAlbums(),
    watchFetchSongsInAlbum(),
    watchFetchArtists(),
    watchFetchArtistSongs(),
    watchFetchSongCountInGenre(),
    watchFetchCategoryCount(),
    watchFetchArtistsWork(),
    watchFetchGenres(),
    watchFetchSongsInGenre(),
    watchAddNewSong(),
    watchEditSong(),
    watchDeleteSong(),
    watchCreatePlaylist(),
    watchFetchPlaylist(),
    watchFetchSongsInPlaylist(),
    watchAddToPlaylist(),
    watchDeletePlaylist(),
  ]);
}

export default rootSaga;
