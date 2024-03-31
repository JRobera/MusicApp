import api from "../util/axios";

const fetchArtists = async () => {
  try {
    const response = await api.get("/api/getallartists");
    return response.data;
  } catch (error) {
    throw new Error("Error while fetching artists");
  }
};

const fetchArtistSongs = async (artistName: string) => {
  try {
    const response = await api.get(`/api/artist-songs/${artistName}`);
    return response.data;
  } catch (error) {
    throw new Error("Error while getting artist songs");
  }
};

export { fetchArtists, fetchArtistSongs };
