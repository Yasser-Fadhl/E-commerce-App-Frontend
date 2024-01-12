// src/slicers/productsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// Define an initial state for the slice

const initialState = {
  loading: true,
  isAuthenticated: false,
  user: {},
  token: null,
  error: null,
};

// Define an async thunk for fetching products from the API
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (user, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/login",
        { email: user.email, password: user.password },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      if (error.response && error.response.data.Message) {
        console.log(error.response.data);
        return rejectWithValue(error.response.data.Message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (user, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/register",
        user,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      return data;
    } catch (error) {
      if (error.response && error.response.data.Message) {
        return rejectWithValue(error.response.data.Message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
export const loadUser = createAsyncThunk(
  "auth/loadUser",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get("http://localhost:4000/api/v1/me", {
        withCredentials: true,
      });

      return response.data;
    } catch (error) {
      if (error.response && error.response.data.Message) {
        console.log(error.response.data);
        return thunkAPI.rejectWithValue(error.response.data.Message);
      } else {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  }
);
export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (id, thunkAPI) => {
    try {
      axios.get("http://localhost:4000/api/v1/logout", {
        withCredentials: true,
      });
    } catch (error) {
      if (error.response && error.response.data.Message) {
        console.log(error.response.data);
        return thunkAPI.rejectWithValue(error.response.data.Message);
      } else {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  }
);
// Create a slice with reducers and actions
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearErrors: (state) => {
      return {
        ...state,
        error: null,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.isAuthenticated = false;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.payload;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.isAuthenticated = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.payload;
      })
      .addCase(loadUser.pending, (state) => {
        state.loading = true;
        state.isAuthenticated = false;
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        // console.log(action);
        // state.token = action.payload.token;
      })
      .addCase(loadUser.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        // state.error = action.payload;
        // console.log(action);
      })
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.isAuthenticated = false;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        // state.token = action.payload.token;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.payload;
      });
  },
});
export const { clearErrors } = authSlice.actions;

export default authSlice.reducer;
