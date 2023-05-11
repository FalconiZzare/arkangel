import React from 'react';
//MUI
import { Box, Button } from '@mui/material';
//Custom
import { COLORS } from './GlobalColors';

export const ButtonRedacted = ({ wide, ...props }) => {
  return (
    <Box
      {...props}
      sx={{
        fontSize: '18px',
        color: COLORS.White,
        minWidth: '86px',
        height: '24px',
        padding: '11px 5px',
        textAlign: 'center',
        cursor: 'pointer',
        transition: 'all .6s ease-in-out',
        position: 'relative',
        '&:hover': {
          color: COLORS.Orange,
          borderRadius: '4px',
          transition: 'all .3s ease'
        },
        '&::after': {
          content: '""',
          display: 'block',
          position: 'absolute',
          height: '3px',
          width: 0,
          borderRadius: '3px',
          background: COLORS.Orange,
          right: '10.5px',
          top: '1px',
          transition: 'all .3s ease-out'
        },
        '&:hover::after': {
          left: '10.5px',
          width: wide ? '100px' : '75px'
        }
      }}
    >
      {props.children}
    </Box>
  );
};

export const SubmitButton = (props) => {
  return (
    <Button
      {...props}
      type="submit"
      variant="outlined"
      sx={{
        width: '160px',
        height: '45px',
        fontWeight: 700,
        letterSpacing: '2px',
        border: `1px solid ${COLORS.Orange}`,
        color: COLORS.Orange,
        transition: 'all 400ms ease-in-out',
        '&:hover': {
          color: COLORS.Orange,
          border: `1px solid ${COLORS.Orange}`,
          background: COLORS.FadedOrange
        }
      }}
    />
  );
};
