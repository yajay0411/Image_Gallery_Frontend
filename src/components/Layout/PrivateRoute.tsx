import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, RouteProps, useLocation } from "react-router-dom";
import Appbar from "../Appbar/Appbar";
import Sidebar from "../Sidebar/Sidebar";
import { RootState } from "../../redux/Store";
import { Stack } from "@mui/material";

const PrivateRoute: React.FC<RouteProps> = () => {
  const location = useLocation();
  const isAuthenticated = useSelector(
    (state: RootState) => state.AuthReducer.isAuthenticated
  );

  const menu = useSelector((state: RootState) => state.BaseReducer.menu);

  if (isAuthenticated) {
    return (
      <>
        <nav className="header">
          <Stack>
            <Appbar />
            {menu && <Sidebar open={menu} />}
          </Stack>
        </nav>
        <main className="main">
          <Outlet />
        </main>
      </>
    );
  }
  return (
    <Navigate to="/auth/login" replace state={{ from: location.pathname }} />
  );
};

export default PrivateRoute;
