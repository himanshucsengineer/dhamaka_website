import React from 'react';
import Authlayout from '../../src/layouts/Authlayout';
import {
  Button,
  List,
  ListItem,
  TextField,
  Checkbox,
  FormGroup,
  FormControlLabel,
} from '@mui/material';
export default function forgotpass() {
  return (
    <Authlayout title="Forgot Password">
      <form>
        <List>
          <ListItem>
            <TextField
              required
              variant="outlined"
              fullWidth
              id="email"
              label="Email"
              inputProps={{ type: 'email' }}
            ></TextField>
          </ListItem>

          <ListItem>
            <Button variant="contained" type="submit">
              Forgot Password
            </Button>
          </ListItem>
        </List>
      </form>
    </Authlayout>
  );
}
