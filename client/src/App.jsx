import React, { createContext, useMemo, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
//Custom
import Header from './layouts/Header/Header';
import EchelonRoutes from './routes/ArkangelRoutes';
import ScrollToTop from './utils/utils';
import { createTheme, ThemeProvider } from '@mui/material';

const theme = createTheme({
  typography: {
    allVariants: {
      fontFamily: 'Mulish'
    }
  }
});

export const UserContext = createContext(null);

const App = () => {
  const [user, setUser] = useState(undefined);
  const userValue = useMemo(
    () => ({
      user,
      setUser
    }),
    [user, setUser]
  );
  return (
    <>
      <ThemeProvider theme={theme}>
        <UserContext.Provider value={userValue}>
          <BrowserRouter>
            <ScrollToTop />
            <Header />
            <EchelonRoutes />
          </BrowserRouter>
        </UserContext.Provider>
      </ThemeProvider>
    </>
  );
};

export default App;
