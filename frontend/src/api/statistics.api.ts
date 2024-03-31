import api from "../util/axios";

const fetchCategoryCount = async () => {
  try {
    const response = await api.get("/api/totalCatCount");
    return response.data;
  } catch (error) {
    throw new Error("Error Fetching Category Count!");
  }
};

const fetchArtistsWork = async () => {
  try {
    const response = await api.get("/api/artist-song-album");
    return response.data;
  } catch (error) {
    throw new Error("Error Fetching Artist Work!");
  }
};
export { fetchCategoryCount, fetchArtistsWork };
