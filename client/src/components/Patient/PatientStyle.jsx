import React from 'react';
import { IconButton, Stack, Typography } from '@mui/material';
import { COLORS, SHADOWS } from '../../utils/GlobalColors';
import { DeleteRounded, EditRounded } from '@mui/icons-material';
import moment from 'moment/moment';

export const PatientCard = ({ item, handleDelete }) => {
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
      <Stack>
        <Stack direction={'row'} spacing={2}>
          <Typography>{`Patient ID: ${item.id}`}</Typography>
          <Typography>{`Name: ${item.first_name} ${item.last_name}`}</Typography>
        </Stack>
        <Stack direction={'row'} spacing={2}>
          <Typography>{`Gender: ${item.gender}`}</Typography>
          <Typography>{`DoB: ${moment(item.date_of_birth).format('DD-MM-YYYY')}`}</Typography>
        </Stack>
        <Typography>{`Phone: ${item.phone_number}`}</Typography>
        <Typography>{`Address: ${item.address}`}</Typography>
      </Stack>
      <Stack height={'100%'} justifyContent={'space-around'}>
        <IconButton size={'small'}>
          <EditRounded
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
