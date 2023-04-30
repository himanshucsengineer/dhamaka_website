import * as React from 'react';
import Authlayout from '../../src/layouts/Authlayout';
import {
  Button,
  List,
  ListItem,
  TextField,
  Checkbox,
  FormGroup,
  FormControlLabel,
} from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Router from 'next/router';
import { API_URL } from '../api/config';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Signup() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [name, setName] = React.useState('');
  const [number, setNumber] = React.useState('');
  const [confirmpassword, setConfirmPassword] = React.useState('');
  const [recommandation, setRecommandation] = React.useState('');
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

    if (password == confirmpassword) {
      const data = new FormData();
      data.append('name', name);
      data.append('email', email);
      data.append('password', password);
      data.append('number', number);
      data.append('recommandation', recommandation);
      const res = await fetch(API_URL + 'createuser', {
        headers: [],
        method: 'POST',
        body: data,
      });
      const resonsedata = await res.json();
      if (resonsedata.status) {
        setSnackcolor(resonsedata.status);
        setMessage(resonsedata.message);
        handleClick();
        if (resonsedata.status == 'success') {
          Router.push('/login');
        }
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
    <Authlayout title="Signup">
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
      <form className="signup_form" onSubmit={handleSubmit}>
        <List>
          <ListItem>
            <TextField
              required
              variant="outlined"
              fullWidth
              id="nanme"
              label="Full Name"
              inputProps={{ type: 'text' }}
              onChange={(e) => setName(e.target.value)}
            ></TextField>
          </ListItem>
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
              id="number"
              label="Phone Number"
              inputProps={{ type: 'number' }}
              onChange={(e) => setNumber(e.target.value)}
            ></TextField>
          </ListItem>
          <ListItem>
            <TextField
              required
              variant="outlined"
              fullWidth
              id="password"
              label="Password"
              inputProps={{ type: 'password' }}
              onChange={(e) => setPassword(e.target.value)}
            ></TextField>
          </ListItem>
          <ListItem>
            <TextField
              required
              variant="outlined"
              fullWidth
              id="confirmPassword"
              label="Confirm Password"
              inputProps={{ type: 'text' }}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></TextField>
          </ListItem>
          <ListItem>
            <TextField
              variant="outlined"
              fullWidth
              id="recommandation"
              label="Recommandation Code"
              inputProps={{ type: 'text' }}
              onChange={(e) => setRecommandation(e.target.value)}
            ></TextField>
          </ListItem>
          <ListItem>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="I agree privacy policy"
                disabled
              />
            </FormGroup>
          </ListItem>
          <ListItem>
            <Button variant="contained" type="submit">
              Signup
            </Button>
          </ListItem>
        </List>
      </form>
    </Authlayout>
  );
}
