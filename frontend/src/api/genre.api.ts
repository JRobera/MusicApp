import api from "../util/axios";

const fetchSongCountInGenre = async () => {
  try {
    const response = await api.get(`/api/song-count-in-genre`);
    return response.data;
  } catch (error) {
    throw new Error("Error while fetching song count in genre");
  }
};

const fetchAllGenres = async () => {
  try {
    const response = await api.get(`/api/getallgenres`);
    return response.data;
  } catch (error) {
    throw new Error("");
  }
};

const fetchSongsInGenre = async (genre: string) => {
  try {
    const response = await api.get(`/api/songs-in-genre/${genre}`);
    return response.data;
  } catch (error) {
    throw new Error("Error while fetching songs in genre");
  }
};

export { fetchSongCountInGenre, fetchAllGenres, fetchSongsInGenre };
