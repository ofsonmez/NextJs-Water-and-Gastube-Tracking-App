import { Box, Grid, makeStyles, Paper } from '@material-ui/core';
import Layout from 'components/Layout';
import Orders from 'components/Orders';
import { useRouter } from 'next/router';
import SaleForm from 'components/SaleForm';
import React, { useEffect, useState } from 'react';

const axios = require('axios');

const API_URL = 'http://127.0.0.1:3000';

type getData = {
  id: number;
  Product: string;
  FullName: string;
  CreatedAt: string;
  Price: number;
  Count: number;
};

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
}));

export default function Home() {
  const classes = useStyles();
  const Router = useRouter();
  const [token, setToken] = useState<string | null>(
    typeof window !== 'undefined' ? localStorage.getItem('token') : null,
  );
  const [row, setRow] = React.useState<getData[] | null>([]);

  useEffect(() => {
    const localToken =
      typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    const token1 = localToken !== null ? JSON.parse(localToken) : '';
    setToken(token1);
    if (token && token.length > 0) {
      const rows = axios
        .get(`${API_URL}/sale/list`, {
          headers: {
            Authorization: 'Bearer ' + token1,
          },
        })
        .then((datas: any) => {
          setRow(datas.data);
        });
    } else {
      Router.replace('/login');
    }
  }, []);

  return (
    <Layout>
      <Box sx={{ display: 'flex' }}>
        <Grid item xs={12} md={8} lg={8}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 240,
            }}
          >
            <Orders rows={row} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={4} lg={4} style={{ marginLeft: 10 }}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 240,
            }}
          >
            <SaleForm />
          </Paper>
        </Grid>
      </Box>
    </Layout>
  );
}
