import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Provider, useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "./store";
import store from "./store";
import CardPage from "./components/pages/SearchPage";
import Layout from "./components/Layout";
import SettingsPage from "./components/pages/SettingsPage";
import FavoritesPage from "./components/pages/FavoritesPage";
import { fetchSettings } from "./features/settings/settingsSlice";
import { fetchFavorites } from "./features/favorites/favoritesSlice";

const App: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { themeMode } = useSelector((state: RootState) => state.settings);

  useEffect(() => {
    // Load settings from IndexedDB
    dispatch(fetchSettings());
    dispatch(fetchFavorites());
    // Remove existing theme mode classes
    document.body.classList.remove("light-mode", "dark-mode");
    // Add the current theme mode class
    document.body.classList.add(
      themeMode === "dark" ? "dark-mode" : "light-mode"
    );
  }, [dispatch, themeMode]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/browse" replace />} />
          <Route path="browse" element={<CardPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          {/* Add more routes here as needed */}
        </Route>
      </Routes>
    </Router>
  );
};

// Wrap the entire app with Provider
const RootApp: React.FC = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default RootApp;
