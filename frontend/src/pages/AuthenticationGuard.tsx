import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
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

  useEffect(() => {
    async function Auth() {
      try {
        dispatch(setUserRequest());
      } catch (error) {
        dispatch(setUserFailure(error));
      }
    }
    Auth();
  }, [dispatch]);

  // If the user is authenticated, show them the dashboard. Otherwise, redirect to login page.
  if (userStatus === "pending" || user === null) {
    return <Loading />;
  }

  return user ? <Outlet /> : <Navigate to={"/"} replace />;
}
