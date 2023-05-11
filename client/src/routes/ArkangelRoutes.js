import React, { useContext, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { UserContext } from '../App';

//Pages
import Home from '../components/Home/Home';
import Login from '../pages/Login/Login';
import Patient from '../components/Patient/Patient';

const EchelonRoutes = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user]);
  return (
    <>
      <Routes>
        <Route path={'/'} element={<Home />} />
        <Route path={'/home'} element={<Home />} />
        <Route path={'/login'} element={<Login />} />
        <Route path={'/patient'} element={<Patient />} />
      </Routes>
    </>
  );
};

export default EchelonRoutes;
