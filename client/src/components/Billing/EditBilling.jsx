import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Form, Formik, useFormik } from 'formik';
import { COLORS } from '../../utils/GlobalColors';
import { Divider, Grid, Stack, Typography } from '@mui/material';
import { BILL_INFO } from '../../utils/fields';
import StyledInputField from '../../ui/StyledInputField';
import { SubmitButton } from '../../utils/ButtonRedacted';
import { updateBill } from '../../api/billing';

const EditBilling = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { item } = state;
  const { id } = useParams();

  const handleUpdateBill = async (values) => {
    const billFormData = new FormData();

    for (const key in values) {
      billFormData.append(key, values[key]);
    }

    try {
      const res = await updateBill(id, billFormData);
      if (res.data.success) {
        navigate('/billing');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const formik = useFormik({
    initialValues: {
      patient_id: item.patient_id,
      appointment_id: item.appointment_id,
      amount: item.amount,
      payment_date: item.payment_date
    },
    onSubmit: (values) => {
      handleUpdateBill(values);
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
          Update Bill
        </Typography>
        <Divider />
        <Stack>
          <Formik initialValues={formik.initialValues} onSubmit={formik.handleSubmit}>
            <Form>
              <Grid container rowGap={3}>
                {BILL_INFO.map((item, index) => (
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

export default EditBilling;
