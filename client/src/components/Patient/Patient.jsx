import React, { useEffect, useState } from 'react';
import { Divider, Grid, Stack, Typography } from '@mui/material';
import { Form, Formik, useFormik } from 'formik';
import { COLORS } from '../../utils/GlobalColors';
import { PATIENT_INFO } from '../../utils/fields';
import StyledInputField from '../../ui/StyledInputField';
import { SubmitButton } from '../../utils/ButtonRedacted';
import { addPatient, deletePatient, getPatients } from '../../api/patient';
import { PatientCard } from './PatientStyle';

const Patient = () => {
  const [data, setData] = useState([]);
  const handleAddPatient = async (values, resetForm) => {
    const patientFormData = new FormData();
    for (const key in values) {
      patientFormData.append(key, values[key]);
    }

    try {
      const res = await addPatient(patientFormData);
      if (res.data.success) {
        resetForm({ values: '' });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getPatientData = () => {
    const fetchData = async () => {
      const res = await getPatients();
      if (res.data.success) {
        console.log(res.data.message);
        setData(res.data.data);
      }
    };

    fetchData().catch((err) => {
      console.log(err);
    });
  };

  useEffect(() => {
    getPatientData();
  }, []);

  const handlePatientDelete = async (id) => {
    try {
      const res = await deletePatient(id);
      if (res.data.success) setData(data.filter((patient) => patient.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const formik = useFormik({
    initialValues: {
      id: '',
      first_name: '',
      last_name: '',
      gender: '',
      date_of_birth: '',
      phone_number: '',
      address: ''
    },
    onSubmit: (values, { resetForm }) => {
      handleAddPatient(values, resetForm);
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
          Add A Patient
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
                  <SubmitButton>Submit</SubmitButton>
                </Grid>
              </Grid>
            </Form>
          </Formik>
        </Stack>
      </Stack>
      <Stack
        width={'94%'}
        p={'1rem 2rem'}
        spacing={2}
        sx={{
          background: COLORS.White,
          borderRadius: '10px'
        }}
      >
        <Grid container rowGap={1}>
          {data &&
            data.map((item, index) => (
              <Grid
                key={index}
                item
                xs={12}
                sm={6}
                md={4}
                display={'flex'}
                justifyContent={'center'}
              >
                <PatientCard item={item} handleDelete={handlePatientDelete} />
              </Grid>
            ))}
        </Grid>
      </Stack>
    </Stack>
  );
};

export default Patient;
