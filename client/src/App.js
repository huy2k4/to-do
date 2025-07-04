import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { loadUser } from './redux/slices/userSlice';
import Header from './components/Layout/Header/Header';
import Footer from './components/Layout/Footer';
import AppRoutes from './routes/AppRoutes.jsx';
import './assets/css/app.css';

// import DragonTDL from './assets/images/DragonTDL.png'; 

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const saved = localStorage.getItem('user');
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
        {/* <img src={DragonTDL} alt="Dragon TDL" /> */}
        {/* Hoặc <img src="/DragonTDL.png" alt="Dragon TDL" /> nếu dùng từ public */}
      </div>
    </Router>
  );
}