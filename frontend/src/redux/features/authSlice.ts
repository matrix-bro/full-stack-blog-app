import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { displayAlert } from "./alertSlice";

export const register = createAsyncThunk(
  "auth/signup",
  async (
    {
      first_name,
      last_name,
      email,
      password,
      password2,
    }: {
      first_name: string;
      last_name: string;
      email: string;
      password: string;
      password2: string;
    },
    thunkAPI
  ) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({
      first_name,
      last_name,
      email,
      password,
      password2,
    });

    try {
      const response = await axios.post(
        "http://localhost:8000/api/register/",
        body,
        config
      );

      if (response.status === 201) {
        // display alert
        thunkAPI.dispatch(
          displayAlert({
            message: "Registration Successfull. You can now login.",
            alertType: "success",
          })
        );

        return response.data;
      } else {
        return thunkAPI.rejectWithValue(response.data);
      }
    } catch (error: any) {
      console.log(error.response.data);
      // display alert
      thunkAPI.dispatch(
        displayAlert({
          message: `Error: Registration Failed.`,
          alertType: "error",
        })
      );
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (
    { email, password }: { email: string; password: string },
    thunkAPI
  ) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const data = JSON.stringify({ email, password });

    try {
      const response = await axios.post(
        "http://localhost:8000/api/token/",
        data,
        config
      );

      if (response.status === 200) {
        localStorage.setItem("token", response.data.access);

        // display alert
        thunkAPI.dispatch(
          displayAlert({ message: "Login Successfull", alertType: "success" })
        );

        // Session expires after 30 min = 30 * 60 * 1000
        setTimeout(() => {
          thunkAPI.dispatch(logout());
          window.location.reload();
        }, 1000 * 60 * 30);

        return response.data.access;
      } else {
        return thunkAPI.rejectWithValue(response.data);
      }
    } catch (error: any) {
      console.log(error.response.data);
      // display alert
      thunkAPI.dispatch(
        displayAlert({
          message: `Error: Invalid username or password.`,
          alertType: "error",
        })
      );

      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const verifyAuth = createAsyncThunk(
  "auth/verify",
  async (_, thunkAPI) => {
    try {
      const ac_token = localStorage.getItem("token");
      const data = {
        token: ac_token,
      };
      const response = await axios.post(
        "http://localhost:8000/api/token/verify/",
        data
      );

      if (response.status === 200) {
        console.log("Verified");
        return response.data;
      } else {
        console.log("Not Verified");
        return thunkAPI.rejectWithValue(response.data);
      }
    } catch (error: any) {
      console.log("ERROR Verification", error.response.data);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  registered: boolean;
}

const initialState: AuthState = {
  token: null,
  isAuthenticated: false,
  loading: false,
  registered: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetRegistered: (state) => {
      state.registered = false;
    },
    logout: (state) => {
      localStorage.removeItem("token");
      state.token = null;
      state.loading = false;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
      })
      .addCase(register.fulfilled, (state) => {
        state.loading = false;
        state.registered = true;
      })
      .addCase(register.rejected, (state) => {
        state.loading = false;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.token = action.payload;
      })
      .addCase(login.rejected, (state) => {
        state.loading = false;
      })
      .addCase(verifyAuth.pending, (state) => {
        state.loading = true;
      })
      .addCase(verifyAuth.fulfilled, (state) => {
        state.loading = false;
        state.isAuthenticated = true;
      })
      .addCase(verifyAuth.rejected, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        localStorage.removeItem("token");
      });
  },
});

export const { resetRegistered, logout } = authSlice.actions;

export default authSlice.reducer;
