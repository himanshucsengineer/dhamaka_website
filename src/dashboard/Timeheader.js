import React from 'react';
import Head from 'next/head';
import Bottomnavbar from '../navbars/bottomnavbar';
import store from '../store/store';
import Router from 'next/router';
import { useState, useRef, useEffect } from 'react';
import { API_URL } from '../../pages/api/config';
export default function Timeheader({ title, children }) {
  const state = store.getState();

  const isloggedin = state?.user?.user?.id;

  if (!isloggedin) {
    Router.push('/login');
  }

  const Ref = useRef(null);
  const [timer, setTimer] = useState('00:00:00');

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
    setTimer('00:03:00');
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

  const handlePeriod = async (e) => {
    console.log('period');
  };

  useEffect(() => {
    if (timer == '00:00:15') {
      handlePeriod();
    }
  }, [timer]);

  if (timer == '00:00:00') {
    clearTimer(getDeadTime());
  }

  return (
    <>
      <Head>
        <title>{title ? `${title} - Dhamaka Sale` : 'Dhamaka Sale'}</title>
      </Head>
      {children}
      <Bottomnavbar />
    </>
  );
}
