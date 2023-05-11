import React from 'react';
//Custom
import Background from '../../assets/images/login_bg.png';
import { COLORS } from '../../utils/GlobalColors';
//MUI
import { Container, Stack, TextField, Typography } from '@mui/material';

export const LoginContainer = (props) => {
  return (
    <Stack
      {...props}
      justifyContent={'center'}
      sx={{
        backgroundImage: `url(${Background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh'
      }}
    />
  );
};

export const FormContainer = ({ isMobile, ...props }) => {
  return (
    <Container
      {...props}
      maxWidth="sm"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        width: isMobile ? '350px' : '400px',
        minHeight: '500px',
        background: COLORS.BlurBg,
        backdropFilter: 'blur(15px)',
        border: `2px solid ${COLORS.BlurBgBorder}`,
        borderRadius: '20px'
      }}
    />
  );
};

export const LoginForm = ({ padding, ...props }) => {
  return (
    <Stack
      {...props}
      component="form"
      spacing={'2rem'}
      alignItems={'center'}
      sx={{
        width: '100%',
        py: padding ? padding : 0
      }}
    />
  );
};

export const Credential = (props) => {
  return (
    <TextField
      {...props}
      variant={'outlined'}
      required
      autoComplete={'off'}
      sx={{
        width: '100%',
        borderColor: COLORS.White,
        '& fieldset': {
          borderColor: `${COLORS.White} !important`,
          borderRadius: '10px !important'
        },
        '& input': {
          fontSize: '18px',
          fontWeight: 500,
          color: COLORS.White,
          caretColor: COLORS.White
        },
        '& label, & .MuiInputLabel-root.Mui-focused': {
          color: COLORS.White,
          pl: '2px'
        }
      }}
    />
  );
};

export const ButtonContainer = (props) => {
  return (
    <Stack
      {...props}
      sx={{
        mt: '1rem !important',
        width: '100%',
        height: '4em',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    />
  );
};

export const LoginNavigationText = ({ isNavigating, ...props }) => {
  return (
    <Typography
      {...props}
      sx={{
        fontSize: isNavigating ? '14px' : '16px',
        fontWeight: 400,
        color: COLORS.White,
        cursor: isNavigating ? 'pointer' : 'default',
        transition: 'all 500ms ease-in-out',
        '&:hover': {
          color: isNavigating ? COLORS.Orange : COLORS.White
        }
      }}
    />
  );
};

export const StatusText = (props) => {
  return (
    <Typography
      {...props}
      sx={{
        mt: '1rem !important',
        height: '18px',
        fontSize: '18px',
        fontWeight: 700,
        color: COLORS.Error
      }}
    />
  );
};
