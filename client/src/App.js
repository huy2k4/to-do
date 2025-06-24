import React,{useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';
import { loadFromStorage } from './redux/slices/userSlice.js';
import Header from './components/Layout/Header/Header.js';
import Footer from './components/Layout/Footer';
import AppRoutes from './routes/AppRoutes.jsx';
import './assets/css/app.css';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadFromStorage());
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
