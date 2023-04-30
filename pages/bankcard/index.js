import * as React from 'react';
import Authlayout from '../../src/dashboard/Authlayout';
import {
  Button,
  List,
  ListItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
} from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { API_URL } from '../api/config';
import store from '../../src/store/store';
import { useRouter } from 'next/router';
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const columns = [
  { label: 'Bank Name', minWidth: 170 },
  {
    label: 'Ifsc Code',
    minWidth: 170,
  },
  {
    label: 'Account No.',
    minWidth: 170,
  },
  {
    label: 'Holder Name',
    minWidth: 170,
  },
];

export const getServerSideProps = async () => {
  const res = await fetch(API_URL + 'addbank');
  const data = await res.json();
  return {
    props: {
      data,
    },
  };
};

const Bankcard = ({ data }) => {
  const [Bank, setBank] = React.useState('');
  const [ifsc, setIfsc] = React.useState('');
  const [name, setName] = React.useState('');
  const [account, setAccount] = React.useState('');
  const [confirmaccount, setConfirmAccount] = React.useState('');

  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const [snackcolor, setSnackcolor] = React.useState('');

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
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
  const state = store.getState();
  const router = useRouter();
  const userId = state?.user?.user?.id;
  const finaldata = data.filter((user) => user.userid == userId);
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (account == confirmaccount) {
      const data = new FormData();
      data.append('holder', name);
      data.append('account', confirmaccount);
      data.append('ifsc', ifsc);
      data.append('bank', Bank);
      data.append('userid', userId);
      const res = await fetch(API_URL + 'addbank', {
        headers: [],
        method: 'POST',
        body: data,
      });
      const resonsedata = await res.json();
      if (resonsedata.status) {
        setSnackcolor(resonsedata.status);
        setMessage(resonsedata.message);
        handleClick();
        router.replace(router.asPath);
      } else {
        setSnackcolor('error');
        setMessage('Something Wnet Wrong!');
        handleClick();
      }
    } else {
      setSnackcolor('error');
      setMessage('Please Enter Correct Account Number!');
      handleClick();
    }
  };
  return (
    <Authlayout title="Bank Card">
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
              id="bank"
              label="Bank Name"
              inputProps={{ type: 'text' }}
              onChange={(e) => setBank(e.target.value)}
            ></TextField>
          </ListItem>
          <ListItem>
            <TextField
              required
              variant="outlined"
              fullWidth
              id="ifsc"
              label="IFSC Code"
              inputProps={{ type: 'text' }}
              onChange={(e) => setIfsc(e.target.value)}
            ></TextField>
          </ListItem>
          <ListItem>
            <TextField
              required
              variant="outlined"
              fullWidth
              id="name"
              label="Account Holder Name"
              inputProps={{ type: 'text' }}
              onChange={(e) => setName(e.target.value)}
            ></TextField>
          </ListItem>
          <ListItem>
            <TextField
              required
              variant="outlined"
              fullWidth
              id="setAccount"
              label="Account Number"
              inputProps={{ type: 'text' }}
              onChange={(e) => setAccount(e.target.value)}
            ></TextField>
          </ListItem>
          <ListItem>
            <TextField
              required
              variant="outlined"
              fullWidth
              id="setConfirmAccount"
              label="Confirm Account Number"
              inputProps={{ type: 'text' }}
              onChange={(e) => setConfirmAccount(e.target.value)}
            ></TextField>
          </ListItem>

          <ListItem>
            <Button variant="contained" type="submit">
              Add Bank
            </Button>
          </ListItem>
        </List>
      </form>

      <Paper sx={{ width: '100%', paddingBottom: '5rem' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell key={column.id} align="center">
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {finaldata
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.code}
                    >
                      <TableCell align="center">{row.bank}</TableCell>
                      <TableCell align="center">{row.ifsc}</TableCell>
                      <TableCell align="center">{row.account}</TableCell>
                      <TableCell align="center">{row.holder}</TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={finaldata.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Authlayout>
  );
};

export default Bankcard;
