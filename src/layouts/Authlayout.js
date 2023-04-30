import React from 'react';
import Head from 'next/head';
import { AppBar, Container, Toolbar, Typography, Button } from '@mui/material';
import Bottomnavbar from '../navbars/bottomnavbar';
import KeyboardBackspaceOutlinedIcon from '@mui/icons-material/KeyboardBackspaceOutlined';

import Router from 'next/router';

export default function Authlayout({ title, children }) {
  return (
    <>
      <Head>
        <title>{title ? `${title} - Dhamaka Sale` : 'Dhamaka Sale'}</title>
      </Head>
      <AppBar position="static" className="main_navbar">
        <Toolbar>
          <span onClick={() => Router.back()}>
            <Button
              className="navbar_download_button"
              endIcon={<KeyboardBackspaceOutlinedIcon />}
            ></Button>
          </span>
          <Typography className="page_titlee">{title}</Typography>
        </Toolbar>
      </AppBar>
      <Container>{children}</Container>
      <Bottomnavbar />
    </>
  );
}
