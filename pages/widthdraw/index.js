import * as React from 'react';
import Authlayout from '../../src/dashboard/Authlayout';
import {
  Button,
  List,
  ListItem,
  TextField,
  Checkbox,
  FormGroup,
  FormControlLabel,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Router from 'next/router';
import { API_URL } from '../api/config';
import store from '../../src/store/store';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const getServerSideProps = async () => {
  const res = await fetch(API_URL + 'fetchuser');
  const bankapi = await fetch(API_URL + 'addbank');
  const data = await res.json();
  const bankdata = await bankapi.json();
  return {
    props: {
      data,
      bankdata,
    },
  };
};

const Withdraw = ({ data, bankdata }) => {
  const [amount, setAmount] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const [snackcolor, setSnackcolor] = React.useState('');
  const [bank, setBank] = React.useState('');

  const handleChange = (event) => {
    setBank(event.target.value);
  };

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
    if (amount > 499) {
      const data = new FormData();
      data.append('amount', amount);
      data.append('userid', userId);
      data.append('bankid', bank);
      const res = await fetch(API_URL + 'withdraw', {
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
      setMessage('Minimum Withdraw Amount : 500');
      handleClick();
    }
  };
  const state = store.getState();
  const currentUser = state?.user;
  const userId = currentUser?.user?.id;
  const result = data.find((user) => user.id == userId);
  const finalbank = bankdata.filter((user) => user.userid == userId);

  return (
    <Authlayout title="Withdraw Amount">
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
      <h4 className="available_balans">
        Available Balance : ₹ {result.amount}.00
      </h4>
      <form onSubmit={handleSubmit}>
        <List>
          <ListItem>
            <TextField
              required
              variant="outlined"
              fullWidth
              id="amount"
              label="Enter Amount"
              inputProps={{ type: 'text' }}
              onChange={(e) => setAmount(e.target.value)}
            ></TextField>
          </ListItem>
          <ListItem>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Select Bank</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={bank}
                label="Select Bank"
                onChange={handleChange}
              >
                {finalbank.map((e) => (
                  // eslint-disable-next-line react/jsx-key
                  <MenuItem value={e.id}>{e.bank}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </ListItem>

          <p className="note">Note: Minimum Withdraw amount : ₹ 500</p>
          <ListItem>
            <Button variant="contained" type="submit">
              Withdraw
            </Button>
          </ListItem>
        </List>
      </form>
    </Authlayout>
  );
};

export default Withdraw;
