import React from 'react';
import Head from 'next/head';
import { AppBar, Container, Toolbar, Typography, Button } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import CloudDownloadOutlinedIcon from '@mui/icons-material/CloudDownloadOutlined';
import Bottomnavbar from '../navbars/bottomnavbar';

export default function Layout({ title, children }) {
  return (
    <>
      <Head>
        <title>{title ? `${title} - Dhamaka Sale` : 'Dhamaka Sale'}</title>
      </Head>
      <AppBar position="static" className="main_navbar">
        <Toolbar>
          <div className="navbar_flex">
            <div className="navber_left">
              <Link href="/">
                <Image
                  src="/logo.svg"
                  alt="Dhamaka Sale"
                  width={50}
                  height={50}
                />
              </Link>
            </div>
            <div className="navber_mid">
              <Typography className="nabvar_mid_text">
                Open with an app
              </Typography>
            </div>
            <div className="navber_right">
              <Button
                className="navbar_download_button"
                endIcon={<CloudDownloadOutlinedIcon />}
              ></Button>
            </div>
          </div>
        </Toolbar>
      </AppBar>
      {children}
      <Bottomnavbar />
    </>
  );
}
