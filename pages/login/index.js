import { Button, List, ListItem, TextField } from '@mui/material';
import * as React from 'react';
import Authlayout from '../../src/layouts/Authlayout';
import Router from 'next/router';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useDispatch } from 'react-redux';
import store from '../../src/store/store';
import { loginUser } from '../../src/redux/authSlice';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
export default function Login() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const [snackcolor, setSnackcolor] = React.useState('');

  const dispatch = useDispatch();

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const errorHandle = () => {
    const state = store.getState();
    const currentUser = state?.user;
    // console.log(currentUser);
    if (currentUser?.user?.id) {
      setSnackcolor('success');
      setMessage('Login successfully!');
      handleClick();
      setTimeout(function () {
        Router.push('/dashboard');
      }, 2000);
    } else if (
      currentUser?.msg == 'Account has been blocked. Please contact Admin!'
    ) {
      setSnackcolor('error');
      setMessage('Account has been blocked. Please contact Admin!');
      handleClick();
    } else {
      setSnackcolor('error');
      setMessage('Wrong email or password!');
      handleClick();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = { email, password };

    dispatch(loginUser(body));

    setTimeout(function () {
      errorHandle();
    }, 5000);
  };

  return (
    <Authlayout title="Login">
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
              id="email"
              label="Email"
              inputProps={{ type: 'email' }}
              onChange={(e) => setEmail(e.target.value)}
            ></TextField>
          </ListItem>
          <ListItem>
            <TextField
              required
              variant="outlined"
              fullWidth
              id="password"
              label="Password"
              type="password"
              inputProps={{ type: 'password' }}
              onChange={(e) => setPassword(e.target.value)}
            ></TextField>
          </ListItem>
          <ListItem>
            <Button variant="contained" type="submit">
              Login
            </Button>
          </ListItem>
        </List>
      </form>
      <div className="login_bottom_button_flex">
        <div className="login_bottom_button_flex_left">
          <span onClick={() => Router.push('/signup')}>
            <Button>Register</Button>
          </span>
        </div>
        <div className="login_bottom_button_flex_right">
          <span onClick={() => Router.push('/forgotpss')}>
            <Button>Forgot Password?</Button>
          </span>
        </div>
      </div>
    </Authlayout>
  );
}
