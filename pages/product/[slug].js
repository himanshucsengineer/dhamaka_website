import * as React from 'react';
import Layout from '../../src/layouts/Layout';
import {
  Button,
  CardActionArea,
  CardMedia,
  Container,
  Grid,
  Typography,
} from '@mui/material';
import Image from 'next/image';
import { API_URL } from '../api/config';

export async function getServerSideProps(context) {
  const id = context.query.slug;
  const res = await fetch(API_URL + 'products/' + id);
  const data = await res.json();
  // console.log(data);
  return {
    props: {
      data,
    },
  };
}

const productscreen = (props) => {
  if (!props) {
    return <Layout>Product Not Found</Layout>;
  }
  const data = props.data;
  return (
    <Layout title={data.name}>
      <Container>
        <div className="product_view_main">
          <Grid container spacing={2}>
            <Grid item md={6}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  image={data.image_url}
                  title={data.name}
                  className="proct_image_prodcut_view"
                ></CardMedia>
              </CardActionArea>
            </Grid>
            <Grid item md={6} className="product_view_right_box">
              <Typography className="product_name">{data.name}</Typography>
              <Typography className="product_price">₹{data.price}</Typography>
              <Button className="product_slod_button">Sold Out</Button>
            </Grid>
          </Grid>
          <Typography className="product_spection_heading">
            Product Specification
          </Typography>
          <Grid container spacing={2} className="product_specification_main">
            <Grid item xs={6} className="product_specification_inner">
              <Typography className="specification_name">Brand</Typography>
            </Grid>
            <Grid item xs={6} className="product_specification_inner">
              <Typography className="specification_details">
                {data.brand}
              </Typography>
            </Grid>
            <Grid item xs={6} className="product_specification_inner">
              <Typography className="specification_name">Collection</Typography>
            </Grid>
            <Grid item xs={6} className="product_specification_inner">
              <Typography className="specification_details">
                {data.collection}
              </Typography>
            </Grid>
            <Grid item xs={6} className="product_specification_inner">
              <Typography className="specification_name">Stone</Typography>
            </Grid>
            <Grid item xs={6} className="product_specification_inner">
              <Typography className="specification_details">
                {data.stone}
              </Typography>
            </Grid>
            <Grid item xs={6} className="product_specification_inner">
              <Typography className="specification_name">
                Resizeable?
              </Typography>
            </Grid>
            <Grid item xs={6} className="product_specification_inner">
              <Typography className="specification_details">
                {data.resizeable}
              </Typography>
            </Grid>
            <Grid item xs={6} className="product_specification_inner">
              <Typography className="specification_name">Material</Typography>
            </Grid>
            <Grid item xs={6} className="product_specification_inner">
              <Typography className="specification_details">
                {data.material}
              </Typography>
            </Grid>
            <Grid item xs={6} className="product_specification_inner">
              <Typography className="specification_name">
                Modal Number
              </Typography>
            </Grid>
            <Grid item xs={6} className="product_specification_inner">
              <Typography className="specification_details">
                {data.model_number}
              </Typography>
            </Grid>
            <Grid item xs={6} className="product_specification_inner">
              <Typography className="specification_name">Packaging</Typography>
            </Grid>
            <Grid item xs={6} className="product_specification_inner">
              <Typography className="specification_details">
                {data.packaging}
              </Typography>
            </Grid>
            <Grid item xs={6} className="product_specification_inner">
              <Typography className="specification_name">
                Stone Shape
              </Typography>
            </Grid>
            <Grid item xs={6} className="product_specification_inner">
              <Typography className="specification_details">
                {data.stone_shape}
              </Typography>
            </Grid>
            <Grid item xs={6} className="product_specification_inner">
              <Typography className="specification_name">
                Stone Color
              </Typography>
            </Grid>
            <Grid item xs={6} className="product_specification_inner">
              <Typography className="specification_details">
                {data.stone_color}
              </Typography>
            </Grid>
            <Grid item xs={6} className="product_specification_inner">
              <Typography className="specification_name">
                Stone Clarity
              </Typography>
            </Grid>
            <Grid item xs={6} className="product_specification_inner">
              <Typography className="specification_details">
                {data.stone_clarity}
              </Typography>
            </Grid>
            <Grid item xs={6} className="product_specification_inner">
              <Typography className="specification_name">Stone Cut</Typography>
            </Grid>
            <Grid item xs={6} className="product_specification_inner">
              <Typography className="specification_details">
                {data.stone_cut}
              </Typography>
            </Grid>
            <Grid item xs={6} className="product_specification_inner">
              <Typography className="specification_name">
                Inscription
              </Typography>
            </Grid>
            <Grid item xs={6} className="product_specification_inner">
              <Typography className="specification_details">
                {data.inscription}
              </Typography>
            </Grid>
            <Grid item xs={6} className="product_specification_inner">
              <Typography className="specification_name">
                Stone Creation Method
              </Typography>
            </Grid>
            <Grid item xs={6} className="product_specification_inner">
              <Typography className="specification_details">
                {data.stone_creation_method}
              </Typography>
            </Grid>
          </Grid>
        </div>
      </Container>
    </Layout>
  );
};

export default productscreen;
