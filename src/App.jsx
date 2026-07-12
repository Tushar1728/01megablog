import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Header from './components/header/Header.jsx';
import Footer from './components/footer/Footer.jsx';
import {Outlet} from 'react-router-dom';
import authService from './services/authService.js';
import { login, logout } from './store/authSlice.js';

function App() {

  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
      authService
          .getCurrentUser()
          .then((userData) => {
              if (userData) {
                  dispatch(login({ userData }));
              } else {
                  dispatch(logout());
              }
          })
          .finally(() => {
              setLoading(false);
          });
  }, []);

  if (loading) {
      return <div>Loading...</div>;
  }

  return (
    <div className = 'min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className= 'w-full block'>
        <Header/>
        <main>
          <Outlet />
        </main>
        <Footer/>
      </div>
    </div>
  )
}

export default App;