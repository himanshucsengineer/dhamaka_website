import {
  Button,
  Checkbox,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  FormGroup,
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
import * as React from 'react';
import Authlayout from '../../src/dashboard/Authlayout';
import Snackbar from '@mui/material/Snackbar';
import store from '../../src/store/store';
import { API_URL } from '../api/config';

const columns = [
  { label: 'Id', minWidth: 170 },
  {
    label: 'Name',
    minWidth: 170,
  },
  {
    label: 'Email',
    minWidth: 170,
  },
  {
    label: 'Unique Code',
    minWidth: 170,
  },
  {
    label: 'Number',
    minWidth: 170,
  },
];

const newFunction = async(userId)=>{
  const data = new FormData();
  data.append('userid', userId);
  const res = await fetch(API_URL + 'promotion', {
    headers: [],
    method: 'POST',
    body: data,
  });
  const resonsedata = await res.json();
  return resonsedata;
}

export default function Promotion() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [open, setOpen] = React.useState(true);
  const [finaldata,setFinaldata] = React.useState([]);
  const state = store.getState();
  const promotionCode = state.user.user.unique_code;
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [opensnack, setOpensnack] = React.useState(false);

  const userId = state.user.user.id;
  React.useEffect( ()=>{
    newFunction(userId).then((res)=>{
      const prodata = res.data.filter((a) => a != null);
      if(prodata){
        setFinaldata(prodata)
      }else{
        setFinaldata([])
      }
  });
  },[])
  
  const handleClick = () => {
    setOpensnack(true);
    navigator.clipboard.writeText(
      'https://dhamakasales.in/signup?code=' + promotionCode
    );
  };
  return (
    <>
      <Authlayout title="Promotion">
        <Snackbar
          message="Copied to clibboard"
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          autoHideDuration={20000}
          onClose={() => setOpensnack(false)}
          open={opensnack}
        />
        <Container>
          <h4>My Promotion Code</h4>
          <p>{promotionCode}</p>
          <h4>My Promotion Link</h4>
          <p>https://dhamakasales.in/signup?code={promotionCode}</p>
          <Button className="copy_link" onClick={handleClick}>
            Copy Link
          </Button>
        </Container>
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
                      <TableCell align="center">{row.id}</TableCell>
                      <TableCell align="center">{row.name}</TableCell>
                      <TableCell align="center">{row.email}</TableCell>
                      <TableCell align="center">{row.unique_code}</TableCell>
                      <TableCell align="center">{row.number}</TableCell>
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
      <Dialog
        fullWidth={true}
        maxWidth={false}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Notice</DialogTitle>
        <DialogContent>
          <p>
            When your friends trade, you will also receive a 30% commission.
            Therefore, the more friends you invite, the higher your commission.
            There is a fixed income every day, the commission is permanent, but
            the reward is only onceWhen they make money, they will invite their
            friends to join them, and then you can get a 20% commission. In this
            way, your team can spread quickly. Therefore, I hope everyone can
            use our platform to make money, make money, and make money!When they
            make money, they will invite their friends to join them, and then
            you can get a 20% commission. In this way, your team can spread
            quickly. Therefore, I hope everyone can use our platform to make
            money, make money, and make money!Level 1 commission: Friends who
            join through your own link belong to your level, when they trade,
            you will get 30% commission.Tier 2 commission: Friends who join
            through your friend link belong to your secondary commission. When
            they trade, you can get 20% commission.Level 3 commission: Friends
            who join through friends of friends belong to your level 3. When
            they trade, you get 10% commission.Promotional rewards: 10% bonus
            amount for the first recharge after the first-level lower level
            joins. If your friend joins through your invitation and recharges
            1000 for the first time, you will get 200
          </p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancle</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
