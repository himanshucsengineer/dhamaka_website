import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material';
import * as React from 'react';
import Authlayout from '../../src/dashboard/Authlayout';
import { API_URL } from '../api/config';
import store from '../../src/store/store';
const columns = [
  { label: 'Transaction Id', minWidth: 170 },
  {
    label: 'Credit/Debit',
    minWidth: 170,
  },
  {
    label: 'Amount',
    minWidth: 170,
  },
  {
    label: 'Date and time',
    minWidth: 170,
  },
];

export const getServerSideProps = async () => {
  const res = await fetch(API_URL + 'transaction');
  const data = await res.json();
  return {
    props: {
      data,
    },
  };
};

export default function Transaction({ data }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const state = store.getState();
  const userId = state.user.user.id;
  const finaldata = data.filter((user) => user.userid == userId);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <Authlayout title="Transaction History">
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
                      <TableCell align="center">
                        {row.credit == 'Credit' ? (
                          <p className="green_text">{row.credit}</p>
                        ) : row.credit == 'Refer' ? (
                          <p className="green_text">{row.credit}</p>
                        ) : row.credit == 'Refer Bonus' ? (
                          <p className="green_text">{row.credit}</p>
                        ) : (
                          <p className="red_text">{row.credit}</p>
                        )}
                      </TableCell>
                      <TableCell align="center">
                        {row.credit == 'Credit' ? (
                          <p className="green_text">+ {row.amount}</p>
                        ) : row.credit == 'Refer' ? (
                          <p className="green_text">+ {row.amount}</p>
                        ) : row.credit == 'Refer Bonus' ? (
                          <p className="green_text">+ {row.amount}</p>
                        ) : (
                          <p className="red_text">- {row.amount}</p>
                        )}
                      </TableCell>
                      <TableCell align="center">{row.created_on}</TableCell>
                      {/* {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === 'number'
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })} */}
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
}
