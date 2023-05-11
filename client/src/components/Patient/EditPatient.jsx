import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Form, Formik, useFormik } from 'formik';
import { COLORS } from '../../utils/GlobalColors';
import { Divider, Grid, Stack, Typography } from '@mui/material';
import { PATIENT_INFO } from '../../utils/fields';
import StyledInputField from '../../ui/StyledInputField';
import { SubmitButton } from '../../utils/ButtonRedacted';
import { updatePatient } from '../../api/patient';

const EditPatient = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { item } = state;
  const { id } = useParams();

  const handleUpdatePatient = async (values) => {
    const patientFormData = new FormData();

    for (const key in values) {
      patientFormData.append(key, values[key]);
    }

    try {
      const res = await updatePatient(id, patientFormData);
      if (res.data.success) {
        navigate('/patient');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const formik = useFormik({
    initialValues: {
      id: item.id,
      first_name: item.first_name,
      last_name: item.last_name,
      gender: item.gender,
      date_of_birth: item.date_of_birth,
      phone_number: item.phone_number ? item.phone_number : '',
      address: item.address ? item.address : ''
    },
    onSubmit: (values) => {
      handleUpdatePatient(values);
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
          Update Patient
        </Typography>
        <Divider />
        <Stack>
          <Formik initialValues={formik.initialValues} onSubmit={formik.handleSubmit}>
            <Form>
              <Grid container rowGap={3}>
                {PATIENT_INFO.map((item, index) => (
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

export default EditPatient;
