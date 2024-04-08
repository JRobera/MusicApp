import { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  currentUser,
  currentUserStatus,
  getaccessToken,
  setUserFailure,
  setUserRequest,
} from "../features/user/userSlice";
import Loading from "./Loading";
import api from "../util/axios";

export default function AuthenticationGuard() {
  const dispatch = useDispatch();
  const user = useSelector(currentUser);
  const userStatus = useSelector(currentUserStatus);
  const accessToken = useSelector(getaccessToken);
  const location = useLocation();

  api.interceptors.request.use(
    (config) => {
      // Add the access token to the request headers
      if (accessToken) {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const prevRequest = error?.config;
      if (error?.response?.status === 403 && !prevRequest?.send) {
        prevRequest.send = true;
        const newAccessToken = dispatch(setUserRequest());
        prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return api(prevRequest);
      }
      return Promise.reject(error);
    }
  );

  useEffect(() => {
    async function Auth() {
      try {
        dispatch(setUserRequest());
      } catch (error) {
        dispatch(setUserFailure(error));
      }
    }
    Auth();
  }, [dispatch, accessToken]);

  if (userStatus === "pending" || user === null) {
    return <Loading />;
  }

  return user ? (
    <Outlet />
  ) : (
    <Navigate to={"/"} state={{ from: location }} replace />
  );
}
