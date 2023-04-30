import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import Layout from '../../src/layouts/Noheader';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from '@mui/material';

import Link from 'next/link';
import { API_URL } from '../api/config';
// import data from '../../src/utils/data';

export const getServerSideProps = async () => {
  const res = await fetch(API_URL + 'products');
  const data = await res.json();
  return {
    props: {
      data,
    },
  };
};

const SearchBar = ({ setSearchQuery }) => (
  <form>
    <div className="searchbar_main_flex">
      <div className="searchbar_main_flex_left">
        <TextField
          id="search-bar"
          className="text input_field"
          onInput={(e) => {
            setSearchQuery(e.target.value);
          }}
          label="Search..."
          variant="outlined"
          placeholder="Search..."
          size="small"
        />
      </div>
      <div className="searchbar_main_flex_right">
        <IconButton type="submit" aria-label="search">
          <SearchIcon style={{ fill: 'blue' }} />
        </IconButton>
      </div>
    </div>
  </form>
);

const filterData = (query, getproducts) => {
  if (!query) {
    return getproducts;
  } else {
    return getproducts.filter((d) => d.name.toLowerCase().includes(query));
  }
};

export default function Search({ data }) {
  const getproducts = data;
  const [searchQuery, setSearchQuery] = React.useState();
  const dataFiltered = filterData(searchQuery, getproducts);
  return (
    <Layout title="Search">
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <Grid container className="product_main">
        {dataFiltered.map((product) => (
          <div item="true" key={product.name} className="main_flex">
            <Card className="product_card">
              <Link href={`/product/${product.id}`}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    image={product.image_url}
                    title={product.name}
                    className="product_image"
                  ></CardMedia>
                  <CardContent className="inner_box">
                    <Typography className="product_name">
                      {product.name}
                    </Typography>
                    <Typography className="product_desc">
                      {product.name}
                    </Typography>
                    <Typography className="product_price">
                      ₹{product.price}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Link>
            </Card>
          </div>
        ))}
      </Grid>
    </Layout>
  );
}
