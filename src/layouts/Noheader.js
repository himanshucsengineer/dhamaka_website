import React from 'react';
import Head from 'next/head';
import { AppBar, Container, Toolbar, Typography, Button } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import CloudDownloadOutlinedIcon from '@mui/icons-material/CloudDownloadOutlined';
import Bottomnavbar from '../navbars/bottomnavbar';

export default function Noheader({ title, children }) {
  return (
    <>
      <Head>
        <title>{title ? `${title} - Dhamaka Sale` : 'Dhamaka Sale'}</title>
      </Head>
      <Container>{children}</Container>
      <Bottomnavbar />
    </>
  );
}
