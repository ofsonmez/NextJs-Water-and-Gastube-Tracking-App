import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import authentication from '../authentication/Auth';
import { useRouter } from 'next/router';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link href="https://material-ui.com/">ofsonmz LTD. ŞTİ.</Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

type FormData = {
  email: string;
  password: string;
};

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
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
    console.log(data);
    const result = await authentication.register(data.email, data.password);
    result ? Router.replace('/') : '/incorrect';
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit(submitForm)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                autoComplete="email"
                autoFocus
                error={!!errors.email}
                {...register('email', {
                  required: {
                    value: true,
                    message: 'Email alanı boş olmamalı!',
                  },
                  maxLength: {
                    value: 50,
                    message: 'Email uzunluğu 50 harften fazla olmamalı!',
                  },
                })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                error={!!errors.password}
                {...register('password', {
                  required: {
                    value: true,
                    message: 'Parola alanı boş olmamalı!',
                  },
                  maxLength: {
                    value: 35,
                    message: 'Parola uzunluğu 35 rakamdan fazla olmamalı!',
                  },
                })}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            SIgn Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/login">Already have an account? Sign in</Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
