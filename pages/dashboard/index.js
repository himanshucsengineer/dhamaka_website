import { Button, List, ListItem, TextField } from '@mui/material';
import * as React from 'react';
import Noheader from '../../src/dashboard/Noheader';
import Router from 'next/router';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import GradingIcon from '@mui/icons-material/Grading';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import MoveToInboxOutlinedIcon from '@mui/icons-material/MoveToInboxOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import PasswordOutlinedIcon from '@mui/icons-material/PasswordOutlined';
import DownloadingOutlinedIcon from '@mui/icons-material/DownloadingOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import Link from 'next/link';

import store from '../../src/store/store';
import { API_URL } from '../api/config';

export const getServerSideProps = async () => {
  const res = await fetch(API_URL + 'fetchuser');
  const data = await res.json();
  return {
    props: {
      data,
    },
  };
};

const Dashboard = ({ data }) => {
  const logoutHandle = () => {
    localStorage.clear();
    window.location.href = '/login';
  };

  const state = store.getState();
  const userId = state.user.user.id;
  const result = data.find((user) => user.id == userId);
  return (
    <>
      <Noheader title="Profile">
        <div className="main_formate">
          <div className="profile_main">
            <div className="profile_main_left">
              <img src="user4.png" />
            </div>
            <div className="profile_main_mid">
              <p>Id : {result.id}</p>
              <p>Name : {result.name}</p>
              <p>Mobile No. : {result.number}</p>
              <p>Email : {result.email}</p>
              <p>Intrest : ₹ 0 Commision : ₹ 0</p>
              <p>Available Balance : ₹ {result.amount}</p>
            </div>
            <div className="profile_main_right">
              <img src="notification.png" />
            </div>
          </div>
          <div className="reachrge_button">
            <div className="reachrge_button_left">
              <Link href={'recharge'}>
                <Button className="reachrge">Recahrge</Button>
              </Link>
            </div>
            <div className="reachrge_button_right">
              <Link href={'widthdraw'}>
                <Button className="widthdrow">Withdraw</Button>
              </Link>
            </div>
          </div>

          <button className="menu_button">
            <LockOpenIcon />
            <span className="button_text">Signin</span>
          </button>

          <Link href={'orders'}>
            <button className="menu_button">
              <GradingIcon />
              <span className="button_text">Orders</span>
            </button>
          </Link>

          <Link href={'promotion'}>
            <button className="menu_button">
              <LocalOfferIcon />
              <span className="button_text">Promotion</span>
            </button>
          </Link>

          <Link href={'redenvelop'}>
            <button className="menu_button">
              <MoveToInboxOutlinedIcon />
              <span className="button_text">Red Envelope</span>
            </button>
          </Link>

          <Link href={'transaction'}>
            <button className="menu_button">
              <AccountBalanceWalletOutlinedIcon />
              <span className="button_text">Transaction History</span>
            </button>
          </Link>

          <Link href={'bankcard'}>
            <button className="menu_button">
              <CreditCardOutlinedIcon />
              <span className="button_text"> Bank Card</span>
            </button>
          </Link>

          <Link href={'address'}>
            <button className="menu_button">
              <BusinessOutlinedIcon />
              <span className="button_text">Address</span>
            </button>
          </Link>

          <Link href={'resetpass'}>
            <button className="menu_button">
              <PasswordOutlinedIcon />
              <span className="button_text">Reset Password</span>
            </button>
          </Link>

          <button className="menu_button">
            <DownloadingOutlinedIcon />
            <span className="button_text">App Download</span>
          </button>

          <Link href="https://t.me/+ezaNru83iW9hNzg1" target="_blank">
            <button className="menu_button">
              <DescriptionOutlinedIcon />
              <span className="button_text">Complaints & Suggestions</span>
            </button>
          </Link>

          <Link href={'privacy'}>
            <button className="menu_button">
              <InfoOutlinedIcon />
              <span className="button_text">Privacy Policy</span>
            </button>
          </Link>

          <Link href={'aggrement'}>
            <button className="menu_button">
              <InfoOutlinedIcon />
              <span className="button_text">Risk Disclosure Agreement</span>
            </button>
          </Link>
          <button className="menu_button" onClick={logoutHandle}>
            <LogoutOutlinedIcon />
            <span className="button_text">Logout</span>
          </button>
        </div>
      </Noheader>
    </>
  );
};

export default Dashboard;
