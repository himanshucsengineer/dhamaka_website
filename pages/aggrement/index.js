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
  const res = await fetch(API_URL + 'risk');
  const data = await res.json();
  return {
    props: {
      data,
    },
  };
};

const Agreement = ({ data }) => {
  const [html, setHtml] = React.useState('');
  React.useEffect(() => {
    data.map((product) => {
      setHtml(product.content);
    });
  }, [html]);
  return (
    <Authlayout title="Risk Disclosure Agreement">
      <Container className="">
        <div dangerouslySetInnerHTML={{ __html: html }}></div>
      </Container>
    </Authlayout>
  );
};

export default Agreement;
