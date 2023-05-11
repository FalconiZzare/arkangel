import React from 'react';
import { TextField } from '@mui/material';
import { COLORS, SHADOWS } from '../utils/GlobalColors';

const StyledInputField = (props) => {
  return (
    <TextField
      required
      {...props}
      variant={'outlined'}
      autoComplete={'off'}
      sx={{
        minWidth: '300px',
        '& input::placeholder': {
          fontSize: '15px'
        },
        borderColor: COLORS.Black,
        '& fieldset': {
          borderColor: `${COLORS.InputBorder} !important`,
          borderRadius: '10px',
          boxShadow: SHADOWS.InputShadow
        },
        '& input': {
          height: '20px',
          px: 4,
          fontSize: '18px',
          fontWeight: 500,
          color: COLORS.Black,
          caretColor: COLORS.Orange
        },
        '& .MuiInputLabel-root.Mui-focused': {
          color: COLORS.Orange
        },
        '& label': {
          color: COLORS.Black,
          pl: '2px'
        },
        '& .MuiInput-root:after': {
          borderBottom: `2px solid ${COLORS.Black} !important`
        }
      }}
    />
  );
};

export default StyledInputField;
