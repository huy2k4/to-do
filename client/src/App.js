import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Layout/Header/Header';
import Footer from './components/Layout/Footer';
import StatsPage from './pages/StatsPage';
import TeamPage from './pages/TeamPage';
import TodoPage from './pages/TodoPage';
import './assets/css/app.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <Routes>
          <Route path="/" element={<TodoPage />} />
          <Route path="/stats" element={<StatsPage />} />
          <Route path="/team" element={<TeamPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
