import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = "https://loan-server-jdbs.onrender.com/authentic";

const initialState = {
  borrower: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const AuthClientLogin = createAsyncThunk(
  "borrower/AuthClientLogin",
  async (borrower, thunkAPI) => {
    try {
      const response = await axios.post(
        `${baseUrl}/signin`,
        {
          emailAddress: borrower.emailAddress,
          password: borrower.password,
        },
        { withCredentials: true }
      );
      return response.data || response.data.message;
    } catch (error) {
      if (error.response) {
        const message = error.response.data.message;
        return thunkAPI.rejectWithValue(message);
      }
    }
  }
);

export async function MyProfileDetails() {
  try {
    return await axios.get(`${baseUrl}/me`, { withCredentials: true });
  } catch (error) {
    console.log(error);
  }
}

export const clientAuthSlice = createSlice({
  name: "clientAuth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
      builder.addCase(AuthClientLogin.pending, (state) => {
        state.isLoading = true;
      });
      builder.addCase(AuthClientLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        if (action.payload && action.payload.message) {
          state.message = action.payload.message;
        }
        if (action.payload) {
          state.borrower = action.payload;
        }
      });
      builder.addCase(AuthClientLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
    },
});

export const { reset } = clientAuthSlice.actions;
export default clientAuthSlice.reducer;
