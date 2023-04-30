import { Email } from '@mui/icons-material';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  msg: '',
  user: '',
  token: '',
  status: '',
  loading: false,
  error: '',
};

export const loginUser = createAsyncThunk('loginuser', async (body) => {
  const data = new FormData();
  data.append('email', body.email);
  data.append('password', body.password);

  const res = await fetch(
    'https://app.dhamakasales.in/api/loginuser',
    {
      method: 'post',
      // headers: {
      //   'Content-type': 'application/json',
      // },
      body: data,
    }
  );

  return await res.json();
});

const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addTocken: (state, action) => {
      state.token = localStorage('token');
    },
    addUser: (state, action) => {
      state.user = localStorage('user');
    },
    logout: (state, action) => {
      state.user = null;
      localStorage.clear();
    },
  },
  extraReducers: {
    [loginUser.pending]: (state, action) => {
      state.loading = true;
    },
    [loginUser.fulfilled]: (
      state,
      { payload: { error, msg, token, status, user } }
    ) => {
      state.loading = false;
      if (error) {
        state.error = error;
      } else {
        state.msg = msg;
        state.token = token;
        state.status = status;
        state.user = user;

        localStorage.setItem('msg', msg);
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('status', status);
        localStorage.setItem('token', token);
      }
    },
    [loginUser.rejected]: (state, action) => {
      state.loading = true;
    },
  },
});

export const { addToken, addUser, logout } = authSlice.actions;
export default authSlice.reducer;
