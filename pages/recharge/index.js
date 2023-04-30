import { Container } from '@mui/material';
import * as React from 'react';
import Authlayout from '../../src/dashboard/Authlayout';

export default function Recharge() {
  return (
    <Authlayout title="Recharge">
      <Container>
        <>
          <div className="reachrge_main">
            <h3>Step 1 : Scan this qr code</h3>
            <img src="qr.jpeg" />
            <p>or</p>
            <h4>paytm-75384834@paytm</h4>
            <h3>
              Step 2 : enter desired amount and pay and take Full Screenshot of
              payment
            </h3>
            <h3>
              Step 3 : Send payment Screenshot to info@dhamakasales.in with your
              registerd number, name, registered email id.
            </h3>
          </div>
        </>
      </Container>
    </Authlayout>
  );
}
