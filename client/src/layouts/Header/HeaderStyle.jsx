import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
//MUI
import { Box, Stack } from '@mui/material';
//Custom
import { COLORS } from '../../utils/GlobalColors';
import Logo from '../../assets/logo/arkangel_logo_orange.png';

export const HeaderContainer = (props) => {
  const [changeColor, setChangeColor] = useState(false);
  const handleHeaderColor = () => {
    if (window.scrollY > 20) setChangeColor(true);
    else setChangeColor(false);
  };
  window.addEventListener('scroll', handleHeaderColor);
  window.addEventListener('touchstart', handleHeaderColor);
  window.addEventListener('touchmove', handleHeaderColor);

  return (
    <Stack
      {...props}
      width={'100%'}
      direction={'row'}
      alignItems={'center'}
      justifyContent={'space-between'}
      position={'fixed'}
      top={0}
      py={{
        xs: 1,
        sm: 1,
        md: 2,
        lg: 2,
        xl: 2
      }}
      pl={{
        xs: 0,
        sm: 0,
        md: 4,
        lg: 4,
        xl: 4
      }}
      spacing={2}
      zIndex={500}
      sx={{
        background: changeColor ? 'rgba(15,20,30,0.4)' : COLORS.DarkGrey,
        backdropFilter: 'blur(12px)',
        fontFamily: 'Mulish',
        fontWeight: '500',
        transition: 'all 700ms ease-in-out'
      }}
    />
  );
};

export const LogoContainer = ({ navigateTo }) => {
  const navigate = useNavigate();
  return (
    <Box
      onClick={() => navigate(`/${navigateTo}`)}
      sx={{
        width: {
          xs: '200px',
          sm: '280px',
          md: '280px',
          lg: '280px',
          xl: '280px'
        },
        pr: {
          xs: 8,
          sm: 8,
          md: 0,
          lg: 0,
          xl: 0
        },
        cursor: 'pointer',
        transition: '.3s ease-in-out',
        mr: 'auto !important',
        '&:hover': {
          transform: 'scale(1.025)',
          transition: '.3s ease-in-out'
        }
      }}
    >
      <img width={'100%'} src={Logo} alt={'ark_Logo'} />
    </Box>
  );
};
