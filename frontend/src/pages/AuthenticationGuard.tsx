import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  currentUser,
  setUserFailure,
  setUserRequest,
} from "../features/user/userSlice";
import Loading from "./Loading";

export default function AuthenticationGuard() {
  const dispatch = useDispatch();
  const user = useSelector(currentUser);

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
  if (user === null) {
    return <Loading />;
  }

  return user ? <Outlet /> : <Navigate to={"/"} replace />;
}
