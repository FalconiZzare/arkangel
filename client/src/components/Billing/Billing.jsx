import React, { useEffect, useState } from 'react';
import { Divider, Grid, Stack, Typography } from '@mui/material';
import { Form, Formik, useFormik } from 'formik';
import { COLORS } from '../../utils/GlobalColors';
import { BILL_INFO } from '../../utils/fields';
import StyledInputField from '../../ui/StyledInputField';
import { SubmitButton } from '../../utils/ButtonRedacted';
import { addBill, deleteBill, getBills } from '../../api/billing';
import { BillCard } from './BillingStyle';

const Billing = () => {
  const [data, setData] = useState([]);
  const handleAddBill = async (values, resetForm) => {
    const billFormData = new FormData();
    for (const key in values) {
      billFormData.append(key, values[key]);
    }

    try {
      const res = await addBill(billFormData);
      if (res.data.success) {
        resetForm({ values: '' });
        getBillData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getBillData = () => {
    const fetchData = async () => {
      const res = await getBills();
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
    getBillData();
  }, []);

  const handleBillDelete = async (id) => {
    try {
      const res = await deleteBill(id);
      if (res.data.success) setData(data.filter((bill) => bill.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const formik = useFormik({
    initialValues: {
      patient_id: '',
      appointment_id: '',
      amount: '',
      payment_date: ''
    },
    onSubmit: (values, { resetForm }) => {
      handleAddBill(values, resetForm);
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
          Add A Bill
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
          Bill List
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
                <BillCard item={item} handleDelete={handleBillDelete} />
              </Grid>
            ))}
        </Grid>
      </Stack>
    </Stack>
  );
};

export default Billing;
