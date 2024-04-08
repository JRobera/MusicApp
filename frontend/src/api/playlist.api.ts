import api from "../util/axios";

type Cplaylist = {
  userId: string;
  playlistName: string;
};
type AddPlaylistParams = {
  songId: string;
  playlistId: string;
};
type UpdatePlaylistParams = {
  newPlaylistOrder: string[];
  playlistId: string;
};
type DeletePlaylistParams = {
  userId: string;
  playlistId: string;
};

const createPlaylist = async ({ userId, playlistName }: Cplaylist) => {
  try {
    const response = await api.post(`/api/create-playlist/${userId}`, {
      playlistName,
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch playlist");
  }
};

const fetchPlaylists = async (userId: string) => {
  try {
    const response = await api.get(`/api/getallplaylists/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch playlist");
  }
};

const fetchPlaylist = async (playlistId: string) => {
  try {
    const response = await api.get(`/api/get-songs-playlist/${playlistId}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch playlist");
  }
};

const addOrRemoveSongToPlaylist = async ({
  songId,
  playlistId,
}: AddPlaylistParams) => {
  try {
    const response = await api.post(
      `/api/add-to-playlist?playlistId=${playlistId}&songId=${songId}`
    );
    return response.data;
  } catch (err) {
    throw new Error("Error adding the song to the playlist");
  }
};

const updatePlaylistOrder = async ({
  newPlaylistOrder,
  playlistId,
}: UpdatePlaylistParams) => {
  try {
    const response = await api.patch("/api/update-playlist-order", {
      newPlaylistOrder,
      playlistId,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

const deletePlaylist = async ({ userId, playlistId }: DeletePlaylistParams) => {
  try {
    const response = await api.delete(
      `/api/remove-playlist?playlistId=${playlistId}&userId=${userId}`
    );
    return response.data;
  } catch (error) {
    throw new Error("Could not delete Playlist");
  }
};

export {
  createPlaylist,
  fetchPlaylists,
  fetchPlaylist,
  addOrRemoveSongToPlaylist,
  updatePlaylistOrder,
  deletePlaylist,
};
