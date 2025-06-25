import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';
import { loadUser } from './redux/slices/userSlice.js';
import Header from './components/Layout/Header/Header.js';
import Footer from './components/Layout/Footer';
import AppRoutes from './routes/AppRoutes.jsx';
import './assets/css/app.css';
import { CloudSnow } from 'lucide-react';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const saved = localStorage.getItem('user');
    console.log(localStorage.getItem('user')); //tao ra null
    if (saved) {
      dispatch(loadUser(JSON.parse(saved)));
    }
  }, [dispatch]);

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
