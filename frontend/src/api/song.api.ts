import api from "../util/axios";

type FormDataType = {
  id?: string;
  title: string;
  artist: string;
  album: string;
  genre: string;
  coverImage?: File | null;
  newSong?: File | null;
};

const addNewSong = async (newSong: FormDataType) => {
  try {
    const response = await api.post("/api/addsong", newSong);
    return response.data;
  } catch (error) {
    throw error;
  }
};

//
const fetchSongs = async () => {
  try {
    const response = await api.get("/api/getallsongs");
    return response.data;
  } catch (error) {
    throw error;
  }
};

//
const updateSong = async (updatedSong: FormDataType) => {
  try {
    const response = await api.patch("/api/updatesong", updatedSong);
    return response.data;
  } catch (error) {
    throw error;
  }
};

//
const deleteSong = async (id: string) => {
  try {
    const response = await api.put(`/api/deletesong/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export { addNewSong, fetchSongs, updateSong, deleteSong };
