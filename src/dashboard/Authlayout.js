import React from 'react';
import Head from 'next/head';
import { AppBar, Container, Toolbar, Typography, Button } from '@mui/material';
import Bottomnavbar from '../navbars/bottomnavbar';
import KeyboardBackspaceOutlinedIcon from '@mui/icons-material/KeyboardBackspaceOutlined';
import store from '../store/store';
import Router from 'next/router';

export default function Authlayout({ title, children }) {
  const state = store.getState();

  const isloggedin = state?.user?.user?.id;

  if (!isloggedin) {
    Router.push('/login');
  }
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
      {children}
      <Bottomnavbar />
    </>
  );
}
