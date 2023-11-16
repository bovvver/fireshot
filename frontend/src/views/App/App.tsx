import { useEffect } from "react";
import NavBar from "@components/organisms/NavBar/NavBar";
import AppTheme from "@styles/AppTheme";
import { CssBaseline, Box } from "@mui/material";
import BottomNavBar from "@components/organisms/BottomNavBar/BottomNavBar";
import Home from "../Home/Home";
import { Routes, Route } from "react-router-dom";
import {
  ROOT_PATH,
  LOGIN_PATH,
  PROFILE_PATH_W_PARAM,
  ADD_PATH,
  PHOTO_PATH,
} from "@config/routes";
import Profile from "../Profile/Profile";
import { useLocation } from "react-router-dom";
import AuthenticationForm from "../AuthenticationForm/AuthenticationForm";
import RedirectIfNotAuthenticated from "@components/atoms/RedirectIfNotAuthenticated/RedirectIfNotAuthenticated";
import SearchModal from "@components/molecules/SearchModal/SearchModal";
import AddPhoto from "../AddPhoto/AddPhoto";
import Toast from "@components/atoms/Toast/Toast";
import Notifications from "@components/organisms/Notifications/Notifications";
import CommentDrawer from "@components/organisms/CommentDrawer/CommentDrawer";
import { useModals, useAuth } from "@hooks/contextHooks";
import PhotoSection from "../PhotoSection/PhotoSection";
import DeletePhotoModal from "@components/molecules/DeletePhotoModal/DeletePhotoModal";
import { apiClient } from "@api/ApiClient";
import { authPaths } from "@config/apiPaths";

const App = () => {
  const { handleRefresh } = useAuth();
  const { isDrawerOpen } = useModals();
  const location = useLocation();

  let refreshCount = 0;

  apiClient.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const response = error.response;
      const request = error.config;

      if (response && (response.status === 401 || response.status === 403)) {
        if (refreshCount < 1) {
          refreshCount++;
          await handleRefresh();

          if (!Object.values(authPaths).includes(request.url)) {
            apiClient.request(request);
            refreshCount = 0;
          }
        } else refreshCount = 0;
      } else {
        return Promise.reject(error);
      }
    }
  );

  useEffect(() => {
    handleRefresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const publicRoutes = [
    { path: LOGIN_PATH, component: <AuthenticationForm /> },
  ];

  const protectedRoutes = [
    { path: ROOT_PATH, component: <Home /> },
    { path: PROFILE_PATH_W_PARAM, component: <Profile /> },
    { path: ADD_PATH, component: <AddPhoto /> },
    { path: PHOTO_PATH, component: <PhotoSection /> },
  ];

  const shouldShowNavBar = location.pathname !== LOGIN_PATH;
  const paddingBottom = shouldShowNavBar ? "60px" : 0;

  return (
    <AppTheme>
      <CssBaseline />
      <Toast />
      <Box sx={{ paddingBottom }}>
        {shouldShowNavBar ? <NavBar /> : null}
        <Routes>
          {publicRoutes.map((route, idx) => (
            <Route path={route.path} key={idx} element={route.component} />
          ))}
          {protectedRoutes.map((route, idx) => (
            <Route
              path={route.path}
              key={idx}
              element={
                <RedirectIfNotAuthenticated>
                  {route.component}
                </RedirectIfNotAuthenticated>
              }
            />
          ))}
        </Routes>
        {shouldShowNavBar ? <BottomNavBar /> : null}
      </Box>
      <SearchModal />
      <DeletePhotoModal />
      <Notifications />
      <CommentDrawer open={isDrawerOpen} />
    </AppTheme>
  );
};

export default App;
