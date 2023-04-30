import { Tab, Tabs } from '@mui/material';
import * as React from 'react';
import Authlayout from '../../src/dashboard/Authlayout';

export default function Orders() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Authlayout title="Orders">
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons={false}
        aria-label="scrollable prevent tabs example"
      >
        <Tab label="All" />
        <Tab label="Undelivered" />
        <Tab label="Unrecive" />
        <Tab label="Success" />
      </Tabs>
    </Authlayout>
  );
}
