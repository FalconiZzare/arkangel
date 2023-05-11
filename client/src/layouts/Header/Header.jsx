import React, { useContext } from 'react';
//MUI
import { Stack } from '@mui/material';
//Custom
import { HeaderContainer, LogoContainer } from './HeaderStyle';
import { ButtonRedacted } from '../../utils/ButtonRedacted';
import Navigate from '../../utils/Navigate';
import { UserContext } from '../../App';

const Header = ({ children }) => {
  const { user } = useContext(UserContext);

  if (!user) return children;

  return (
    <HeaderContainer>
      <Stack direction={'row'} spacing={2} mr={'auto !important'} alignItems={'center'}>
        <LogoContainer navigateTo={'home'} />
        <Navigate to={'/patient'} width={'auto'}>
          <ButtonRedacted>Patient</ButtonRedacted>
        </Navigate>
        <Navigate to={'/listings'} width={'auto'}>
          <ButtonRedacted>Doctor</ButtonRedacted>
        </Navigate>
        <Navigate to={'/part-listings'} width={'auto'}>
          <ButtonRedacted wide={true}>Appointment</ButtonRedacted>
        </Navigate>
        <Navigate to={'/part-listings'} width={'auto'}>
          <ButtonRedacted>Billing</ButtonRedacted>
        </Navigate>
      </Stack>
    </HeaderContainer>
  );
};

export default Header;
