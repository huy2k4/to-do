import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { loadUser } from './redux/slices/userSlice';
import Header from './components/Layout/Header/Header';
import Footer from './components/Layout/Footer';
import AppRoutes from './routes/AppRoutes';
import './assets/css/app.css';

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
      </div>
    </Router>
  );
}
