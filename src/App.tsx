import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import CardPage from './components/SearchPage';
import Layout from './components/Layout'; // Ensure you have a Layout component for the sidebar

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/browse" replace />} /> {/* Redirect root to browse */}
            <Route path="browse" element={<CardPage />} />
            {/* Add more routes here as needed */}
          </Route>
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;

