import React from 'react';
import { IconButton, Stack, Typography } from '@mui/material';
import { COLORS, SHADOWS } from '../../utils/GlobalColors';
import { DeleteRounded, EditRounded } from '@mui/icons-material';
import moment from 'moment/moment';
import { useNavigate } from 'react-router-dom';

export const AppointmentCard = ({ item, handleDelete }) => {
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
        <Typography>{`Appointment ID: ${item.appointment_id}`}</Typography>
        <Typography>{`Patient Name: ${item.patient_name}`}</Typography>
        <Typography>{`Doctor Name: ${item.doctor_name}`}</Typography>
        <Typography>{`Date & Time: ${moment(item.appointment_date).format(
          'DD-MM-YYYY HH:MM A'
        )}`}</Typography>
      </Stack>
      <Stack height={'100%'} justifyContent={'space-around'}>
        <IconButton size={'small'}>
          <EditRounded
            onClick={() =>
              navigate(`/appointment/update/${item.appointment_id}`, { state: { item: item } })
            }
            sx={{
              color: COLORS.Blue
            }}
          />
        </IconButton>
        <IconButton onClick={() => handleDelete(item.appointment_id)} size={'small'}>
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
