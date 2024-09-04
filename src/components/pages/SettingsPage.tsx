import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import {
  toggleOfflineMode,
  setThemeMode,
  clearLocalStorage,
} from "../../features/settings/settingsSlice";
import PageHeader from "../PageHeader";
import Spinner from "../Spinner"; // Spinner component for loading indication

const SettingsPage: React.FC = () => {
  const dispatch = useDispatch();
  const { offlineMode, themeMode } = useSelector(
    (state: RootState) => state.settings
  );

  const [loading, setLoading] = useState(false);

  const handleOfflineModeToggle = () => {
    dispatch(toggleOfflineMode());

    if (!offlineMode) {
      // Start the web worker for downloading cards
      setLoading(true);
      const worker = new Worker(new URL("../../workers/offlineWorker.ts", import.meta.url));
      worker.postMessage({ url: "http://localhost:8080/api/cards" });

      worker.onmessage = function (event) {
        if (event.data.status === "complete") {
          setLoading(false);
        } else if (event.data.status === "error") {
          console.error(event.data.message);
          setLoading(false);
        }
      };
    }
  };

  const handleThemeModeToggle = () => {
    const newThemeMode: "light" | "dark" =
      themeMode === "light" ? "dark" : "light";
    dispatch(setThemeMode(newThemeMode));

    document.body.classList.toggle("light-mode", newThemeMode === "light");
    document.body.classList.toggle("dark-mode", newThemeMode === "dark");
  };

  const handleClearLocalStorage = () => {
    const confirmed = window.confirm("Are you sure you want to clear local storage?");
    if (confirmed) {
      dispatch(clearLocalStorage());
    }
  };

  return (
    <div className="settings-page img-bg">
      <PageHeader title="Settings" />
      <div className="page">
        <div className="setting-item">
          <label>
            <input
              type="checkbox"
              checked={offlineMode}
              onChange={handleOfflineModeToggle}
            />
            Offline Mode
          </label>
        </div>
        <div className="setting-item">
          <label>
            <input
              type="checkbox"
              checked={themeMode === "dark"}
              onChange={handleThemeModeToggle}
            />
            Dark Mode
          </label>
        </div>
        <div className="setting-item">
          <button className="btn" onClick={handleClearLocalStorage}>
            Clear Local Storage
          </button>
        </div>
        {loading && (
          <div className="spinner-container">
            <Spinner />
            <p>Downloading cards for offline mode...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingsPage;
