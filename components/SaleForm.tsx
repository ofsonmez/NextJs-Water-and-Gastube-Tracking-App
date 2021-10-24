import React from 'react';
import { useForm } from 'react-hook-form';
import {
  Button,
  Checkbox,
  CssBaseline,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  makeStyles,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from '@material-ui/core';
import { useRouter } from 'next/router';
import authentication from '../authentication/Auth';

const axios = require('axios');

const API_URL = 'http://127.0.0.1:3000';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '50vh',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

type FormData = {
  Product: string;
  Count: number;
  FullName: string;
};

const config = authentication.authHeader();

const SaleForm = () => {
  const classes = useStyles();
  const Router = useRouter();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormData>({
    mode: 'onSubmit',
  });

  const submitForm = async (data: FormData) => {
    const localToken =
      typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    const token = localToken !== null ? JSON.parse(localToken) : '';
    const response = axios
      .post(`${API_URL}/sale/add`, data, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      .then((res: any) => {
        if (res.data) {
          window.location.reload();
        }
      });
  };

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          component={Paper}
          elevation={6}
          square
        >
          <div className={classes.paper}>
            <Typography component="h1" variant="h5">
              Sale
            </Typography>
            <FormControl variant="outlined" fullWidth>
              <InputLabel id="select-label">Product</InputLabel>
              <Select
                required
                labelId="select-label"
                id="product"
                label="Age"
                {...register('Product', { required: true })}
              >
                <MenuItem value="Sırma">Sırma</MenuItem>
                <MenuItem value="Erikli">Erikli</MenuItem>
                <MenuItem value="İpragaz">İpragaz</MenuItem>
              </Select>
            </FormControl>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name Surname"
              autoComplete="email"
              autoFocus
              error={!!errors.FullName}
              {...register('FullName', {
                required: {
                  value: true,
                  message: "Name can't be null!",
                },
                maxLength: {
                  value: 50,
                  message: 'Name utmost contains 50 characters!',
                },
              })}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="count"
              type="number"
              id="count"
              error={!!errors.Count}
              {...register('Count', {
                required: {
                  value: true,
                  message: "Count can't be null!",
                },
                maxLength: {
                  value: 35,
                  message: 'Count utmost contains 50 numbers!',
                },
              })}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Save
            </Button>
          </div>
        </Grid>
      </Grid>
    </form>
  );
};

SaleForm.propTypes = {};

export default SaleForm;
