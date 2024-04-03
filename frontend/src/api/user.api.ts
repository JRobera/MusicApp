import api from "../util/axios";

type SignUpType = {
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type LogInType = {
  email: string;
  password: string;
};

const signUp = async (newUser: SignUpType) => {
  try {
    const response = await api.post("/auth/signup", newUser);
    return response.data;
  } catch (error) {
    throw error;
  }
};
const logIn = async (user: LogInType) => {
  try {
    const response = await api.post("/auth/signin", user);
    return response.data;
  } catch (error) {
    throw error;
  }
};
const logOut = async () => {
  try {
    const response = await api.get("/auth/logout");
    return response;
  } catch (error) {
    throw error;
  }
};

const isUserAuthenticated = async () => {
  try {
    const response = await api.get("/auth/refresh_token");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export { signUp, logIn, isUserAuthenticated, logOut };
