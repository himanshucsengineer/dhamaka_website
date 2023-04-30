import {
  Container,
  Paper,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tabs,
} from '@mui/material';
import * as React from 'react';
import Authlayout from '../../src/dashboard/Authlayout';
import { API_URL } from '../api/config';

export const getServerSideProps = async () => {
  const res = await fetch(API_URL + 'privacy');
  const data = await res.json();
  return {
    props: {
      data,
    },
  };
};

const Privacy = ({ data }) => {
  const [html, setHtml] = React.useState('');
  React.useEffect(() => {
    data.map((product) => {
      setHtml(product.content);
    });
  }, [html]);
  return (
    <Authlayout title="Privacy Policy">
      <Container className="">
        <div dangerouslySetInnerHTML={{ __html: html }}></div>
      </Container>
    </Authlayout>
  );
};

// export default function Privacy() {
//   return <Authlayout title="Privacy Policy"></Authlayout>;
// }

export default Privacy;
