/* eslint-disable react/jsx-key */
import Layout from '../src/layouts/Layout';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import Carousel from 'react-material-ui-carousel';
import { API_URL } from './api/config';

// import data from '../src/utils/data';

export const getServerSideProps = async () => {
  const res = await fetch(API_URL + 'products');
  const sliderresponse = await fetch(API_URL + 'homeslider');
  const data = await res.json();
  const homeslider = await sliderresponse.json();
  return {
    props: {
      data,
      homeslider,
    },
  };
};

const home = ({ data, homeslider }) => {
  return (
    <Layout>
      <div className="top_section">
        <Typography className="top_section_heading">Welcome Back</Typography>
        <Typography className="top_section_para">Quality Guarantee</Typography>
      </div>
      <Carousel animation="slide" className="carousal_section">
        {homeslider.map((product) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.image}
            alt={product.name}
            className="carousal_image"
          ></img>
        ))}
      </Carousel>
      <div>
        <Grid container className="product_main">
          {data.map((product) => (
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
      </div>
    </Layout>
  );
};

export default home;
