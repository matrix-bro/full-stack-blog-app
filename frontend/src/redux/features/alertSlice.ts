import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const displayAlert = createAsyncThunk(
  "alert/display",
  async ({ message, alertType }: AlertState, thunkAPI) => {
    thunkAPI.dispatch(setAlert({ message, alertType }));

    setTimeout(() => {
      thunkAPI.dispatch(removeAlert());
    }, 3000);
  }
);

interface AlertState {
  message: string | null;
  alertType: "success" | "error" | "info" | null;
}

const initialState: AlertState = {
  message: null,
  alertType: null,
};

const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    setAlert: (state, { payload }) => {
      state.message = payload.message;
      state.alertType = payload.alertType;
    },
    removeAlert: (state) => {
      state.message = null;
      state.alertType = null;
    },
  },
});

export const { setAlert, removeAlert } = alertSlice.actions;

export default alertSlice.reducer;
