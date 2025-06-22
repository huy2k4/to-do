import React from 'react';
import { HashRouter as Router } from 'react-router-dom';

import Header from './components/Layout/Header/Header.js';
import Footer from './components/Layout/Footer';
import AppRoutes from './routes/AppRoutes.jsx';
import './assets/css/app.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <AppRoutes />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
