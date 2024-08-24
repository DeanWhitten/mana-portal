import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import store, { RootState } from './store';
import CardPage from './components/SearchPage';
import Layout from './components/Layout'; // Ensure you have a Layout component for the sidebar
import SettingsPage from './components/SettingsPage';
import { Provider } from 'react-redux';

const App: React.FC = () => {
  const { themeMode } = useSelector((state: RootState) => state.settings);

  useEffect(() => {
    // Remove existing theme mode classes
    document.body.classList.remove('light-mode', 'dark-mode');
    // Add the current theme mode class
    document.body.classList.add(themeMode === 'dark' ? 'dark-mode' : 'light-mode');
  }, [themeMode]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/browse" replace />} /> {/* Redirect root to browse */}
          <Route path="browse" element={<CardPage />} />
          <Route path="/settings" element={<SettingsPage />} />
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


