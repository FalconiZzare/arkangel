import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Form, Formik, useFormik } from 'formik';
import { COLORS } from '../../utils/GlobalColors';
import { Divider, Grid, Stack, Typography } from '@mui/material';
import { APPOINTMENT_INFO } from "../../utils/fields";
import StyledInputField from '../../ui/StyledInputField';
import { SubmitButton } from '../../utils/ButtonRedacted';
import { updateAppointment } from '../../api/appointment';

const EditAppointment = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { item } = state;
  const { id } = useParams();

  const handleUpdateAppointment = async (values) => {
    const appointmentFormData = new FormData();

    for (const key in values) {
      appointmentFormData.append(key, values[key]);
    }

    try {
      const res = await updateAppointment(id, appointmentFormData);
      if (res.data.success) {
        navigate('/appointment');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const formik = useFormik({
    initialValues: {
      patient_id: item.patient_id,
      doctor_id: item.doctor_id,
      appointment_date: item.appointment_date
    },
    onSubmit: (values) => {
      handleUpdateAppointment(values);
    }
  });

  return (
    <Stack
      width={'100%'}
      alignItems={'center'}
      pb={'1rem'}
      spacing={2}
      sx={{
        background: COLORS.LightSilver
      }}
    >
      <Stack
        width={'94%'}
        mt={'7rem'}
        p={'1rem 2rem'}
        spacing={2}
        sx={{
          background: COLORS.White,
          borderRadius: '10px'
        }}
      >
        <Typography
          sx={{
            fontSize: '24px',
            fontWeight: 800
          }}
        >
          Update Appointment
        </Typography>
        <Divider />
        <Stack>
          <Formik initialValues={formik.initialValues} onSubmit={formik.handleSubmit}>
            <Form>
              <Grid container rowGap={3}>
                {APPOINTMENT_INFO.map((item, index) => (
                  <Grid
                    key={index}
                    item
                    xs={12}
                    sm={6}
                    md={3}
                    display={'flex'}
                    justifyContent={'center'}
                  >
                    <StyledInputField
                      label={item.label}
                      name={item.value}
                      type={item.type}
                      value={formik.values[item.value]}
                      onChange={formik.handleChange}
                    />
                  </Grid>
                ))}
                <Grid
                  item
                  xs={12}
                  sx={{
                    textAlign: 'center'
                  }}
                >
                  <SubmitButton>Update</SubmitButton>
                </Grid>
              </Grid>
            </Form>
          </Formik>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default EditAppointment;
