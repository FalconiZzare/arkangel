import React from 'react';
import { IconButton, Stack, Typography } from '@mui/material';
import { COLORS, SHADOWS } from '../../utils/GlobalColors';
import { DeleteRounded, EditRounded } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export const DoctorCard = ({ item, handleDelete }) => {
  const navigate = useNavigate();

  return (
    <Stack
      direction={'row'}
      justifyContent={'space-between'}
      sx={{
        minWidth: '400px',
        overflow: 'hidden',
        height: '100px',
        border: `2px solid ${COLORS.InputBorder}`,
        boxShadow: SHADOWS.InputShadow,
        borderRadius: '10px',
        p: 1
      }}
    >
      <Stack justifyContent={'center'}>
        <Typography>{`Doctor ID: ${item.id}`}</Typography>
        <Typography>{`Name: ${item.first_name} ${item.last_name}`}</Typography>
        <Typography>{`Speciality: ${item.speciality}`}</Typography>
      </Stack>
      <Stack height={'100%'} justifyContent={'space-around'}>
        <IconButton size={'small'}>
          <EditRounded
            onClick={() => navigate(`/doctor/update/${item.id}`, { state: { item: item } })}
            sx={{
              color: COLORS.Blue
            }}
          />
        </IconButton>
        <IconButton onClick={() => handleDelete(item.id)} size={'small'}>
          <DeleteRounded
            sx={{
              color: COLORS.Error
            }}
          />
        </IconButton>
      </Stack>
    </Stack>
  );
};
