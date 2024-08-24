import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { toggleOfflineMode, toggleThemeMode, clearLocalStorage } from '../features/settings/settingsSlice';

const SettingsPage: React.FC = () => {
  const dispatch = useDispatch();
  const { offlineMode, themeMode } = useSelector((state: RootState) => state.settings);

  const handleOfflineModeToggle = () => {
    dispatch(toggleOfflineMode());
  };

  const handleThemeModeToggle = () => {
    const newThemeMode: 'light' | 'dark' = themeMode === 'light' ? 'dark' : 'light';
    dispatch(toggleThemeMode(newThemeMode));

    document.body.classList.toggle('light-mode', newThemeMode === 'light');
    document.body.classList.toggle('dark-mode', newThemeMode === 'dark');
  };

  const handleClearLocalStorage = () => {
    alert('Are you sure you want to clear local storage?');
    dispatch(clearLocalStorage());
  };

  return (
    <div className="settings-page">
      <h2>Settings</h2>
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
            checked={themeMode === 'dark'} 
            onChange={handleThemeModeToggle} 
          />
          Dark Mode
        </label>
      </div>
      <div className="setting-item">
        <button onClick={handleClearLocalStorage}>Clear Local Storage</button>
      </div>
    </div>
  );
};

export default SettingsPage;
