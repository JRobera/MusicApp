import api from "../util/axios";

const fetchAlbums = async () => {
  try {
    const response = await api.get("/api/getallalbums");
    return response.data;
  } catch (error) {
    throw new Error("error while fetching albums");
  }
};

const fetchSongsInAlbum = async (albumName: string) => {
  try {
    const response = await api.get(`/api/song-in-album/${albumName}`);
    return response.data;
  } catch (error) {
    throw new Error("Error while getting songs in album");
  }
};

export { fetchAlbums, fetchSongsInAlbum };
