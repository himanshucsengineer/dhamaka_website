import { Button, List, ListItem, TextField } from '@mui/material';
import * as React from 'react';
import Authlayout from '../../src/dashboard/Authlayout';
import Router from 'next/router';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useDispatch } from 'react-redux';
import store from '../../src/store/store';
import { loginUser, logout } from '../../src/redux/authSlice';
import { API_URL } from '../api/config';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
export default function Login() {
  const [oldPassword, setOldPassword] = React.useState('');
  const [newPassword, setNewPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const [snackcolor, setSnackcolor] = React.useState('');
  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const state = store.getState();
    const currentUser = state?.user;
    const userId = currentUser?.user?.id;

    if (newPassword == confirmPassword) {
      const data = new FormData();
      data.append('oldpassword', oldPassword);
      data.append('newpassword', confirmPassword);
      data.append('userid', userId);
      const res = await fetch(API_URL + 'resetpassword', {
        headers: [],
        method: 'POST',
        body: data,
      });
      const resonsedata = await res.json();
      if (resonsedata.status) {
        setSnackcolor(resonsedata.status);
        setMessage(resonsedata.message);
        handleClick();
      } else {
        setSnackcolor('error');
        setMessage('Something Wnet Wrong!');
        handleClick();
      }
    } else {
      setSnackcolor('error');
      setMessage('Please Enter Correct Password!');
      handleClick();
    }
  };

  return (
    <Authlayout title="Reset Password">
      <Snackbar
        open={open}
        autoHideDuration={5000}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={snackcolor}
          sx={{ width: '100%' }}
        >
          {message}
        </Alert>
      </Snackbar>
      <form onSubmit={handleSubmit}>
        <List>
          <ListItem>
            <TextField
              required
              variant="outlined"
              fullWidth
              id="oldPassword"
              label="Old Password"
              inputProps={{ type: 'text' }}
              onChange={(e) => setOldPassword(e.target.value)}
            ></TextField>
          </ListItem>
          <ListItem>
            <TextField
              required
              variant="outlined"
              fullWidth
              id="password"
              label="New Password"
              type="password"
              inputProps={{ type: 'password' }}
              onChange={(e) => setNewPassword(e.target.value)}
            ></TextField>
          </ListItem>
          <ListItem>
            <TextField
              required
              variant="outlined"
              fullWidth
              id="ConfirmPassword"
              label="Confirm Password"
              type="password"
              inputProps={{ type: 'text' }}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></TextField>
          </ListItem>
          <ListItem>
            <Button variant="contained" type="submit">
              Reset
            </Button>
          </ListItem>
        </List>
      </form>
    </Authlayout>
  );
}
