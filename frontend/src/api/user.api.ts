import api from "../util/axios";

const isUserAuthenticated = async () => {
  try {
    const response = await api.get("/auth/isAuth");
    return response.data;
  } catch (error) {
    throw new Error("Error while authenticating user");
  }
};
const logOut = async () => {
  try {
    const response = await api.post("/auth/logout");
    return response;
  } catch (error) {
    throw new Error("Error while logining out");
  }
};

export { isUserAuthenticated, logOut };
