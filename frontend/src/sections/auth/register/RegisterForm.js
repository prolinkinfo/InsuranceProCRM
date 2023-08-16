import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Stack, IconButton, InputAdornment, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import { useFormik } from 'formik';
import * as yup from "yup";

import { apipost } from '../../../service/api';
import Iconify from '../../../components/iconify';
// ----------------------------------------------------------------------

export default function RgisterForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);


  const initialValues = {
    userName: "",
    emailAddress: "",
    password: ""
  }

  // -----------  validationSchema
  const validationSchema = yup.object({
    userName: yup.string().required(),
    emailAddress: yup.string().email().required(),
    password: yup.string().required(),

  });

  const Adddata = async (values) => {
    const data = values
    const result = await apipost('user/register', data)
    if (result && result.status === 200) {
      navigate('/login')
    }
  }

  // formik
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      Adddata(values)
    },
  });

  return (
    <>
      <form>
        <Stack spacing={3} mb={2}>
          <TextField
            name="userName"
            label="User Name"
            value={formik.values.userName}
            onChange={formik.handleChange}
            error={
              formik.touched.userName &&
              Boolean(formik.errors.userName)
            }
            helperText={
              formik.touched.userName && formik.errors.userName
            }
          />

          <TextField
            name="emailAddress"
            label="Email address"
            value={formik.values.emailAddress}
            onChange={formik.handleChange}
            error={
              formik.touched.emailAddress &&
              Boolean(formik.errors.emailAddress)
            }
            helperText={
              formik.touched.emailAddress && formik.errors.emailAddress
            }
          />

          <TextField
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            value={formik.values.password}
            onChange={formik.handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={
              formik.touched.password &&
              Boolean(formik.errors.password)
            }
            helperText={
              formik.touched.password && formik.errors.password
            }
          />
        </Stack>
      </form>

      {/* <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 2 }}>
        <Link variant="subtitle2" underline="hover" >
          Forgot password?
        </Link>
      </Stack> */}

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={formik.handleSubmit}>
        Sign up
      </LoadingButton>
    </>
  );
}
