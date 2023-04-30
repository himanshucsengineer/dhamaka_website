import {
  Button,
  Checkbox,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
} from '@mui/material';
import React, { useState, useRef, useEffect } from 'react';
import Noheader from '../../src/dashboard/Noheader';
import useSWR from 'swr';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import Link from 'next/link';
import store from '../../src/store/store';
import { API_URL } from '../api/config';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useRouter } from 'next/router';

export const getServerSideProps = async () => {
  const res = await fetch(API_URL + 'fetchuser');
  const fetchlatestperiod = await fetch(API_URL + 'fetchlatestperiod');
  const userrecordres = await fetch(API_URL + 'fetchuserreord');
  const fetchperioddata = await fetch(API_URL + 'fetchparity');
  const datas = await res.json();
  const latestperiod = await fetchlatestperiod.json();
  const userrecorddata = await userrecordres.json();
  const perioddata = await fetchperioddata.json();
  return {
    props: {
      datas,
      userrecorddata,
      perioddata,
      latestperiod,
    },
  };
};
const fetcher = (url) => fetch(url).then((res) => res.json());
const userRecordColumn = [
  { label: 'Period', minWidth: 170 },
  {
    label: 'Contract Money',
    align: 'center',
    minWidth: 100,
  },
  {
    label: 'Contract Count',
    minWidth: 170,
  },
  {
    label: 'Delivery',
    minWidth: 170,
  },
  {
    label: 'Fee',
    minWidth: 170,
  },
  {
    label: 'Open Price',
    minWidth: 170,
  },
  {
    label: 'Result',
    minWidth: 170,
  },
  {
    label: 'Amount',
    minWidth: 170,
  },
  {
    label: 'Select',
    minWidth: 170,
  },
  {
    label: 'Status',
    minWidth: 170,
  },
  {
    label: 'Created On',
    minWidth: 170,
  },
];

const columns = [
  { id: 'period', label: 'Period', align: 'center', minWidth: 170 },
  { id: 'price', label: 'Price', align: 'center', minWidth: 100 },
  {
    id: 'number',
    label: 'Number',
    minWidth: 170,
    align: 'center',
  },
  {
    id: 'result',
    label: 'Result',
    minWidth: 170,
    align: 'center',
  },
];

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Bcone = ({ datas, userrecorddata, perioddata, latestperiod }) => {
  const finalperioddata = perioddata.filter((user) => user.emerd_price != null);

  const state = store.getState();
  const userId = state.user.user.id;
  const result = datas.find((user) => user.id == userId);
  const finaluserrecord = userrecorddata.filter(
    (user) => user.userid == userId
  );
  var getPeriod = '';
  {
    latestperiod.map((f) => (getPeriod = f.period_id));
  }

  const Ref = useRef(null);
  const [timer, setTimer] = useState('00:00:00');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [open, setOpen] = React.useState(false);
  const [color, setColor] = React.useState('');
  const [priceButton, setPricebutton] = React.useState(10);
  const [contractNumber, setContractNumber] = React.useState(1);
  const [opensnack, setOpensnack] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const [snackcolor, setSnackcolor] = React.useState('');

  const handleClick = () => {
    setOpensnack(true);
  };

  const handleClosesnack = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpensnack(false);
  };

  const router = useRouter();

  const handleForm = async (e) => {
    e.preventDefault();
    var totalbatamount = priceButton * contractNumber;

    if (result.amount >= totalbatamount) {
      const type = 'bcone';
      const data = new FormData();
      data.append('userid', userId);
      data.append('contract', priceButton);
      data.append('contractNumber', contractNumber);
      data.append('color', color);
      data.append('type', type);
      const res = await fetch(API_URL + 'parity', {
        headers: [],
        method: 'POST',
        body: data,
      });
      const resonsedata = await res.json();
      if (resonsedata.status == 'success') {
        setSnackcolor('success');
        setMessage('Success!');
        handleClick();
        setOpen(false);
        setPricebutton(10);
        setContractNumber(1);
      } else {
        setSnackcolor('error');
        setMessage('Something Went Wrong!');
        handleClick();
      }
    } else {
      setSnackcolor('error');
      setMessage('Insufficient Balance for Bet!');
      handleClick();
    }
  };

  const getTimeRemaining = (e) => {
    const total = Date.parse(e) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / 1000 / 60 / 60) % 24);
    return {
      total,
      hours,
      minutes,
      seconds,
    };
  };

  const startTimer = (e) => {
    let { total, hours, minutes, seconds } = getTimeRemaining(e);
    if (total >= 0) {
      // update the timer
      // check if less than 10 then we need to
      // add '0' at the beginning of the variable
      setTimer(
        (hours > 9 ? hours : '0' + hours) +
          ':' +
          (minutes > 9 ? minutes : '0' + minutes) +
          ':' +
          (seconds > 9 ? seconds : '0' + seconds)
      );
    }
  };

  const clearTimer = (e) => {
    setTimer('00:02:30');
    if (Ref.current) clearInterval(Ref.current);
    const id = setInterval(() => {
      startTimer(e);
    }, 1000);
    Ref.current = id;
  };

  const getDeadTime = () => {
    let deadline = new Date();
    var curenttime = deadline.getMinutes() + ':' + deadline.getSeconds();
    if (
      curenttime == '3:0' ||
      curenttime == '6:0' ||
      curenttime == '9:0' ||
      curenttime == '12:0' ||
      curenttime == '15:0' ||
      curenttime == '18:0' ||
      curenttime == '21:0' ||
      curenttime == '24:0' ||
      curenttime == '27:0' ||
      curenttime == '30:0' ||
      curenttime == '33:0' ||
      curenttime == '36:0' ||
      curenttime == '39:0' ||
      curenttime == '42:0' ||
      curenttime == '45:0' ||
      curenttime == '48:0' ||
      curenttime == '51:0' ||
      curenttime == '54:0' ||
      curenttime == '57:0' ||
      curenttime == '60:0'
    ) {
      deadline.setSeconds(deadline.getSeconds() + 180);
    } else {
      var currentminute = deadline.getMinutes();
      var totalsecond = '';
      if (
        currentminute == '0' ||
        currentminute == '3' ||
        currentminute == '6' ||
        currentminute == '9' ||
        currentminute == '12' ||
        currentminute == '15' ||
        currentminute == '18' ||
        currentminute == '21' ||
        currentminute == '24' ||
        currentminute == '27' ||
        currentminute == '30' ||
        currentminute == '33' ||
        currentminute == '36' ||
        currentminute == '39' ||
        currentminute == '42' ||
        currentminute == '45' ||
        currentminute == '48' ||
        currentminute == '51' ||
        currentminute == '54' ||
        currentminute == '57'
      ) {
        totalsecond = 180;
      } else if (
        currentminute == '1' ||
        currentminute == '4' ||
        currentminute == '7' ||
        currentminute == '10' ||
        currentminute == '13' ||
        currentminute == '16' ||
        currentminute == '19' ||
        currentminute == '22' ||
        currentminute == '25' ||
        currentminute == '28' ||
        currentminute == '31' ||
        currentminute == '34' ||
        currentminute == '37' ||
        currentminute == '40' ||
        currentminute == '43' ||
        currentminute == '46' ||
        currentminute == '49' ||
        currentminute == '52' ||
        currentminute == '55' ||
        currentminute == '58'
      ) {
        totalsecond = 120;
      } else if (
        currentminute == '2' ||
        currentminute == '5' ||
        currentminute == '8' ||
        currentminute == '11' ||
        currentminute == '14' ||
        currentminute == '17' ||
        currentminute == '20' ||
        currentminute == '23' ||
        currentminute == '26' ||
        currentminute == '29' ||
        currentminute == '32' ||
        currentminute == '35' ||
        currentminute == '38' ||
        currentminute == '41' ||
        currentminute == '44' ||
        currentminute == '47' ||
        currentminute == '50' ||
        currentminute == '53' ||
        currentminute == '56' ||
        currentminute == '59'
      ) {
        totalsecond = 60;
      }
      deadline.setSeconds(
        deadline.getSeconds() + totalsecond - deadline.getSeconds()
      );
    }

    return deadline;
  };

  useEffect(() => {
    clearTimer(getDeadTime());
  }, []);

  const onClickReset = () => {
    clearTimer(getDeadTime());
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleClose = () => {
    setOpen(false);
    setPricebutton(10);
    setContractNumber(1);
  };

  const handleResult = async (e) => {
    console.log('hii');
  };

  useEffect(() => {
    if (timer == '00:00:28') {
      handleResult();
    }
  }, [timer]);

  if (timer == '00:00:10') {
    router.replace(router.asPath);
  }

  return (
    <>
      <Noheader title="Bcone">
        <Snackbar
          open={opensnack}
          autoHideDuration={5000}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          onClose={handleClosesnack}
        >
          <Alert
            onClose={handleClosesnack}
            severity={snackcolor}
            sx={{ width: '100%' }}
          >
            {message}
          </Alert>
        </Snackbar>
        <Container>
          <p>Available Balance : ₹ {result.amount}</p>
          <Link href={'recharge'}>
            <Button className="win_reachrge">Recahrge</Button>
          </Link>
          {/* <Link href={'widthdraw'}> */}
          <Button className="win_widthdrow">Trend</Button>
          {/* </Link> */}
        </Container>
        <div className="win_tab">
          <div className="card">
            <Link href={'win'}>
              <button>Parity</button>
            </Link>
          </div>
          <div className="card">
            <Link href={'sapre'}>
              <button>Sapre</button>
            </Link>
          </div>
          <div className="card">
            <Link href={'bcone'}>
              <button className="win_active">Bcone</button>
            </Link>
          </div>
          <div className="card">
            <Link href={'emerd'}>
              <button>Emerd</button>
            </Link>
          </div>
        </div>
        <Container>
          <div className="cont_down_flex">
            <div className="cont_down_flex_left">
              <p>
                <EmojiEventsOutlinedIcon />
                <span className="prize_text">Period</span>
              </p>
              {latestperiod.map((f) => (
                <h4 key={f.id}>{f.period_id}</h4>
              ))}
            </div>
            <div className="cont_down_flex_right">
              <p>Count Down</p>
              <h3>{timer}</h3>
            </div>
          </div>
          <div className="win_top_button_flex">
            <div className="win_top_button_flex_left">
              {timer <= '00:00:30' ? (
                <button disabled className="disabled_button">
                  Join Green
                </button>
              ) : result.amount < 0 ? (
                <Link href="/recharge">
                  <button>Join Green</button>
                </Link>
              ) : (
                <button
                  onClick={() => {
                    setColor('green');
                    setOpen(true);
                  }}
                >
                  Join Green
                </button>
              )}
            </div>
            <div className="win_top_button_flex_mid">
              {timer <= '00:00:30' ? (
                <button disabled className="disabled_button">
                  Join Voilet
                </button>
              ) : result.amount < 0 ? (
                <Link href="/recharge">
                  <button>Join Voilet</button>
                </Link>
              ) : (
                <button
                  onClick={() => {
                    setColor('voilet');
                    setOpen(true);
                  }}
                >
                  Join Voilet
                </button>
              )}
            </div>
            <div className="win_top_button_flex_right">
              {timer <= '00:00:30' ? (
                <button disabled className="disabled_button">
                  Join Red
                </button>
              ) : result.amount < 0 ? (
                <Link href="/recharge">
                  <button>Join Red</button>
                </Link>
              ) : (
                <button
                  onClick={() => {
                    setColor('red');
                    setOpen(true);
                  }}
                >
                  Join Red
                </button>
              )}
            </div>
          </div>
          <div className="number_button_flex">
            <div className="card">
              {timer <= '00:00:30' ? (
                <button disabled className="disabled_button button_voiled_red">
                  0
                </button>
              ) : result.amount < 0 ? (
                <Link href="/recharge">
                  <button className="button_voiled_red">0</button>
                </Link>
              ) : (
                <button
                  className="button_voiled_red"
                  onClick={() => {
                    setColor('0');
                    setOpen(true);
                  }}
                >
                  0
                </button>
              )}
            </div>
            <div className="card">
              {timer <= '00:00:30' ? (
                <button disabled className="disabled_button button_green">
                  1
                </button>
              ) : result.amount < 0 ? (
                <Link href="/recharge">
                  <button className="button_green">1</button>
                </Link>
              ) : (
                <button
                  className="button_green"
                  onClick={() => {
                    setColor('1');
                    setOpen(true);
                  }}
                >
                  1
                </button>
              )}
            </div>
            <div className="card">
              {timer <= '00:00:30' ? (
                <button disabled className="disabled_button button_red">
                  2
                </button>
              ) : result.amount < 0 ? (
                <Link href="/recharge">
                  <button className="button_red">2</button>
                </Link>
              ) : (
                <button
                  className="button_red"
                  onClick={() => {
                    setColor('2');
                    setOpen(true);
                  }}
                >
                  2
                </button>
              )}
            </div>
            <div className="card">
              {timer <= '00:00:30' ? (
                <button disabled className="disabled_button button_green">
                  3
                </button>
              ) : result.amount < 0 ? (
                <Link href="/recharge">
                  <button className="button_green">3</button>
                </Link>
              ) : (
                <button
                  className="button_green"
                  onClick={() => {
                    setColor('3');
                    setOpen(true);
                  }}
                >
                  3
                </button>
              )}
            </div>
            <div className="card">
              {timer <= '00:00:30' ? (
                <button disabled className="disabled_button button_red">
                  4
                </button>
              ) : result.amount < 0 ? (
                <Link href="/recharge">
                  <button className="button_red">4</button>
                </Link>
              ) : (
                <button
                  className="button_red"
                  onClick={() => {
                    setColor('4');
                    setOpen(true);
                  }}
                >
                  4
                </button>
              )}
            </div>
            <div className="card">
              {timer <= '00:00:30' ? (
                <button
                  disabled
                  className="disabled_button button_voiled_green"
                >
                  5
                </button>
              ) : result.amount < 0 ? (
                <Link href="/recharge">
                  <button className="button_voiled_green">5</button>
                </Link>
              ) : (
                <button
                  className="button_voiled_green"
                  onClick={() => {
                    setColor('5');
                    setOpen(true);
                  }}
                >
                  5
                </button>
              )}
            </div>
            <div className="card">
              {timer <= '00:00:30' ? (
                <button disabled className="disabled_button button_red">
                  6
                </button>
              ) : result.amount < 0 ? (
                <Link href="/recharge">
                  <button className="button_red">6</button>
                </Link>
              ) : (
                <button
                  className="button_red"
                  onClick={() => {
                    setColor('6');
                    setOpen(true);
                  }}
                >
                  6
                </button>
              )}
            </div>
            <div className="card">
              {timer <= '00:00:30' ? (
                <button disabled className="disabled_button button_green">
                  7
                </button>
              ) : result.amount < 0 ? (
                <Link href="/recharge">
                  <button className="button_green">7</button>
                </Link>
              ) : (
                <button
                  className="button_green"
                  onClick={() => {
                    setColor('7');
                    setOpen(true);
                  }}
                >
                  7
                </button>
              )}
            </div>
            <div className="card">
              {timer <= '00:00:30' ? (
                <button disabled className="disabled_button button_red">
                  8
                </button>
              ) : result.amount < 0 ? (
                <Link href="/recharge">
                  <button className="button_red">8</button>
                </Link>
              ) : (
                <button
                  className="button_red"
                  onClick={() => {
                    setColor('8');
                    setOpen(true);
                  }}
                >
                  8
                </button>
              )}
            </div>
            <div className="card">
              {timer <= '00:00:30' ? (
                <button disabled className="disabled_button button_green">
                  9
                </button>
              ) : result.amount < 0 ? (
                <Link href="/recharge">
                  <button className="button_green">9</button>
                </Link>
              ) : (
                <button
                  className="button_green"
                  onClick={() => {
                    setColor('9');
                    setOpen(true);
                  }}
                >
                  9
                </button>
              )}
            </div>
          </div>
        </Container>
        <div className="win_table_heading">
          <p>
            <EmojiEventsOutlinedIcon />
            <span className="record_table">Bcone Record</span>
          </p>
        </div>
        <Paper sx={{ width: '100%', paddingBottom: '5rem', marginTop: '2rem' }}>
          <TableContainer>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell key={column.id} align={column.align}>
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {finalperioddata
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.code}
                      >
                        <TableCell align="center">{row.period_id}</TableCell>
                        <TableCell align="center">{row.bcone_price}</TableCell>
                        <TableCell align="center">{row.bcone_number}</TableCell>
                        <TableCell align="center">
                          <div className="color_center">
                            {row.bcone_color == 'Red' ? (
                              <button className="red_circle"></button>
                            ) : row.bcone_color == 'Green' ? (
                              <button className="green_circle"></button>
                            ) : row.bcone_color == 'Voilet Green' ? (
                              <>
                                <button className="green_circle"></button>
                                <button className="voilet_circle"></button>
                              </>
                            ) : row.bcone_color == 'Voilet Red' ? (
                              <>
                                <button className="red_circle"></button>
                                <button className="voilet_circle"></button>
                              </>
                            ) : null}
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={finalperioddata.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>

        <div className="win_table_heading">
          <p>
            <EmojiEventsOutlinedIcon />
            <span className="record_table">My Record</span>
          </p>
        </div>
        <Paper sx={{ width: '100%', paddingBottom: '5rem', marginTop: '2rem' }}>
          <TableContainer>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {userRecordColumn.map((column) => (
                    <TableCell key={column.id} align={column.align}>
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {finaluserrecord
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.code}
                      >
                        <TableCell align="center">{row.period_id}</TableCell>
                        <TableCell align="center">{row.contract}</TableCell>
                        <TableCell align="center">
                          {row.contract_count}
                        </TableCell>
                        <TableCell align="center">{row.delivery}</TableCell>
                        <TableCell align="center">{row.fee}</TableCell>
                        <TableCell align="center">{row.open_price}</TableCell>
                        <TableCell align="center">{row.result}</TableCell>
                        <TableCell align="center">
                          {row.win_amount > 0 ? (
                            <p className="green_text">+ {row.win_amount}</p>
                          ) : (
                            <p className="red_text">- {row.bat_amount}</p>
                          )}
                        </TableCell>
                        <TableCell align="center">
                          {row.select == '1,3,5,7,9' ? (
                            <p className="green_text">Green</p>
                          ) : row.select == '0,2,4,6,8' ? (
                            <p className="red_text">Red</p>
                          ) : row.select == '0,5' ? (
                            <p className="voilet_text">Voilet</p>
                          ) : (
                            row.select
                          )}
                        </TableCell>

                        <TableCell align="center">
                          {row.status == 'Success' ? (
                            <p className="green_text">{row.status}</p>
                          ) : (
                            <p className="red_text">{row.status}</p>
                          )}
                        </TableCell>
                        <TableCell align="center">{row.created_on}</TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={finaluserrecord.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Noheader>
      <Dialog
        fullWidth={true}
        maxWidth={false}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle
          className={
            color == 'green'
              ? 'green_header'
              : color == 'red'
              ? 'red_header'
              : color == 'voilet'
              ? 'voilet_header'
              : 'blue_header'
          }
        >
          Join {color}
        </DialogTitle>
        <DialogContent>
          <p>Contract Money</p>
          <div className="price_buttonnn">
            <div className="card">
              {priceButton == 10 ? (
                <button
                  className={
                    color == 'green'
                      ? 'green_header'
                      : color == 'red'
                      ? 'red_header'
                      : color == 'voilet'
                      ? 'voilet_header'
                      : 'blue_header'
                  }
                >
                  10
                </button>
              ) : (
                <button
                  onClick={() => {
                    setPricebutton(10);
                  }}
                >
                  10
                </button>
              )}
            </div>
            <div className="card">
              {priceButton == 100 ? (
                <button
                  className={
                    color == 'green'
                      ? 'green_header'
                      : color == 'red'
                      ? 'red_header'
                      : color == 'voilet'
                      ? 'voilet_header'
                      : 'blue_header'
                  }
                >
                  100
                </button>
              ) : (
                <button
                  onClick={() => {
                    setPricebutton(100);
                  }}
                >
                  100
                </button>
              )}
            </div>
            <div className="card">
              {priceButton == 1000 ? (
                <button
                  className={
                    color == 'green'
                      ? 'green_header'
                      : color == 'red'
                      ? 'red_header'
                      : color == 'voilet'
                      ? 'voilet_header'
                      : 'blue_header'
                  }
                >
                  1000
                </button>
              ) : (
                <button
                  onClick={() => {
                    setPricebutton(1000);
                  }}
                >
                  1000
                </button>
              )}
            </div>
            <div className="card">
              {priceButton == 10000 ? (
                <button
                  className={
                    color == 'green'
                      ? 'green_header'
                      : color == 'red'
                      ? 'red_header'
                      : color == 'voilet'
                      ? 'voilet_header'
                      : 'blue_header'
                  }
                >
                  10000
                </button>
              ) : (
                <button
                  onClick={() => {
                    setPricebutton(10000);
                  }}
                >
                  10000
                </button>
              )}
            </div>
          </div>

          <div className="number_counter_flex">
            <div className="number_counter_flex_left">
              <p>Number</p>
            </div>
            <div className="number_counter_flex_right">
              <div className="Number_counter">
                <div className="left">
                  {contractNumber < 2 ? (
                    <button disabled>-</button>
                  ) : (
                    <button
                      onClick={() => {
                        var decrement = contractNumber - 1;
                        setContractNumber(decrement);
                      }}
                    >
                      -
                    </button>
                  )}
                </div>
                <div className="mid">{contractNumber}</div>
                <div className="right">
                  <button
                    onClick={() => {
                      var increment = contractNumber + 1;
                      setContractNumber(increment);
                    }}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
          <p className="final_contaract_mony">
            Total contract money is
            <span
              className={
                color == 'green'
                  ? 'green_text'
                  : color == 'red'
                  ? 'red_text'
                  : color == 'voilet'
                  ? 'voilet_text'
                  : 'blue_text'
              }
            >
              {contractNumber * priceButton}
            </span>
          </p>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="I agree PRESALE RULE"
              disabled
            />
          </FormGroup>
        </DialogContent>
        <DialogActions>
          <div className="modal_action_buttons_flex">
            <div className="modal_action_buttons_flex_left">
              <button onClick={handleClose}>Cancle</button>
            </div>
            <div className="modal_action_buttons_flex_right">
              <button onClick={handleForm}>Confirm</button>
            </div>
          </div>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Bcone;
