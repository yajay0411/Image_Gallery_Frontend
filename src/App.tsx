import React, { LazyExoticComponent, Suspense, lazy, useMemo } from "react";
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";

import { CssBaseline, ThemeProvider } from "@mui/material";
import PrivateRoute from "./components/Layout/PrivateRoute";
import SimpleBackdrop from "./components/BackDrop/SimpleBackDrop";
import { RootState } from "./redux/Store";
import { createTheme } from "@mui/material/styles";
import { darkThemeSettings } from "./theme/DarkTheme";
import { lightThemeSettings } from "./theme/LightTheme";

// extend lazy component with `preload` property
interface LazyPreload<Props>
  extends LazyExoticComponent<React.ComponentType<Props>> {
  preload: () => unknown;
}

function LazyPreload<Props>(
  importStatement: () => Promise<{ default: React.ComponentType<Props> }>
) {
  const Component: LazyPreload<Props> = Object.assign(lazy(importStatement), {
    preload: importStatement,
  });

  return Component;
}

const App: React.FC = () => {
  const Login = LazyPreload(() => import("./pages/Auth/Login/Login"));
  const Register = LazyPreload(() => import("./pages/Auth/Register/Register"));
  const Dashboard = LazyPreload(() => import("./pages/Dashboard/Dashboard"));
  const Profile = LazyPreload(() => import("./pages/Profile/Profile"));
  const InfinteImageScroll = LazyPreload(
    () => import("./pages/InfiniteImageScroll/InfiniteImageScroll")
  );

  const loading = useSelector((state: RootState) => state.BaseReducer.backdrop);
  const mode = useSelector((state: RootState) => state.ThemeReducer.mode);
  // const theme = themeSettings(mode);
  const theme = useMemo(
    () => createTheme(mode === "dark" ? darkThemeSettings : lightThemeSettings),
    [mode]
  );
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SimpleBackdrop show={loading} />
        <div className="app">
          <Suspense fallback={<SimpleBackdrop show={true} />}>
            <Routes>
              //Public Routes
              <Route path="/auth/login" element={<Login />} />
              <Route path="/auth/register" element={<Register />} />
              //Private Routes
              <Route path="/" element={<PrivateRoute />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/profile" element={<Profile />} />
                <Route
                  path="/infinite-image"
                  element={<InfinteImageScroll />}
                />
              </Route>
            </Routes>
          </Suspense>
        </div>
      </ThemeProvider>
    </>
  );
};

export default App;
