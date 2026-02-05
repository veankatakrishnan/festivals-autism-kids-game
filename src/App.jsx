import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Activity from './pages/Activity';
import FestivalMenu from './pages/FestivalMenu';
import MatchingGame from './components/MatchingGame';
import Quiz from './components/Quiz';
import ParentSettings from './pages/ParentSettings';
import { SettingsProvider } from './context/SettingsContext';

function App() {
  return (
    <SettingsProvider>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="festival/:id" element={<FestivalMenu />} />
            <Route path="activity/:id" element={<Activity />} />
            <Route path="match/:id" element={<MatchingGame />} />
            <Route path="quiz/:id" element={<Quiz />} />
            <Route path="settings" element={<ParentSettings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </SettingsProvider>
  );
}

export default App;
