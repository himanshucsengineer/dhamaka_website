import * as React from 'react';
import { Paper, BottomNavigation, BottomNavigationAction } from '@mui/material';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { Link } from 'next/link';
import store from '../store/store';
import Router from 'next/router';

export default function Bottomnavbar() {
  const [value, setValue] = React.useState('/');

  const handleChange = (event, newValue) => {
    setValue(newValue);
    // if (newValue == 'login') {
    //   signIn();
    // } else {

    // }
    Router.push(newValue);
  };
  const state = store.getState();

  const isloggedin = state?.user?.user?.id;

  return (
    <Paper
      sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}
      elevation={3}
    >
      <BottomNavigation showLabels value={value} onChange={handleChange}>
        <BottomNavigationAction
          label="Home"
          value="/"
          icon={<HomeOutlinedIcon />}
        />

        <BottomNavigationAction
          label="Search"
          value="search"
          icon={<SearchOutlinedIcon />}
        />
        {isloggedin ? (
          <BottomNavigationAction
            label="Win"
            value="win"
            icon={<EmojiEventsOutlinedIcon />}
          />
        ) : null}

        {isloggedin ? (
          <BottomNavigationAction
            label="My"
            value="dashboard"
            icon={<PersonOutlineOutlinedIcon />}
          />
        ) : (
          <BottomNavigationAction
            label="My"
            value="login"
            icon={<PersonOutlineOutlinedIcon />}
          />
        )}
      </BottomNavigation>
    </Paper>
  );
}
