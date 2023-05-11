import React, { useEffect, useState } from 'react';
import { Divider, Grid, Stack, Typography } from '@mui/material';
import { Form, Formik, useFormik } from 'formik';
import { COLORS } from '../../utils/GlobalColors';
import { DOC_INFO } from '../../utils/fields';
import StyledInputField from '../../ui/StyledInputField';
import { SubmitButton } from '../../utils/ButtonRedacted';
import { addDoctor, deleteDoctor, getDoctors } from '../../api/doctor';
import { DoctorCard } from './DoctorStyle';

const Doctor = () => {
  const [data, setData] = useState([]);
  const handleAddDoctor = async (values, resetForm) => {
    const doctorFormData = new FormData();
    for (const key in values) {
      doctorFormData.append(key, values[key]);
    }

    try {
      const res = await addDoctor(doctorFormData);
      if (res.data.success) {
        resetForm({ values: '' });
        getDoctorData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getDoctorData = () => {
    const fetchData = async () => {
      const res = await getDoctors();
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
    getDoctorData();
  }, []);

  const handleDoctorDelete = async (id) => {
    try {
      const res = await deleteDoctor(id);
      if (res.data.success) setData(data.filter((doctor) => doctor.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const formik = useFormik({
    initialValues: {
      id: '',
      first_name: '',
      last_name: '',
      speciality: ''
    },
    onSubmit: (values, { resetForm }) => {
      handleAddDoctor(values, resetForm);
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
          Add A Doctor
        </Typography>
        <Divider />
        <Stack>
          <Formik initialValues={formik.initialValues} onSubmit={formik.handleSubmit}>
            <Form>
              <Grid container rowGap={3}>
                {DOC_INFO.map((item, index) => (
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
        <Typography
          sx={{
            fontSize: '24px',
            fontWeight: 800
          }}
        >
          Doctor List
        </Typography>
        <Divider />
        <Grid container rowGap={1}>
          {data &&
            data.map((item, index) => (
              <Grid
                key={index}
                item
                xs={12}
                sm={6}
                md={4}
                lg={4}
                xl={3}
                display={'flex'}
                justifyContent={'center'}
              >
                <DoctorCard item={item} handleDelete={handleDoctorDelete} />
              </Grid>
            ))}
        </Grid>
      </Stack>
    </Stack>
  );
};

export default Doctor;
