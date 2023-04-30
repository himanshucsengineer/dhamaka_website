import React from 'react';
import Head from 'next/head';
import Bottomnavbar from '../navbars/bottomnavbar';
import store from '../store/store';
import Router from 'next/router';

export default function Noheader({ title, children }) {
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
      {children}
      <Bottomnavbar />
    </>
  );
}
