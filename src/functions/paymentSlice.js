import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const baseUrl = "http://localhost:5050/pay";

const initialState = {
  pay: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export async function PaymentBalance() {
  try {
    const response = await axios.get(`${baseUrl}/balance`, {
      withCredentials: true,
    });
    return response.data.balance;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function PaymentHistory(uuid) {
  try {
    return await axios.get(`${baseUrl}/view/${uuid}`, {
      withCredentials: true,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function WeeklyPaidAverage() {
  try {
    return await axios.get(`${baseUrl}/weekly`, { withCredentials: true });
  } catch (error) {
    console.log(error);
  }
}

export async function MonthlyPaidAverage() {
  try {
    return await axios.get(`${baseUrl}/monthly`, { withCredentials: true });
  } catch (error) {
    console.log(error);
  }
}

export async function GetAllPayments() {
  try {
    return await axios.get(`${baseUrl}/pay`, { withCredentials: true });
  } catch (error) {
    console.log(error);
  }
}

export const MakeLoanPayment = createAsyncThunk(
  "pay/MakeLoanPayment",
  async (payment_details, thunkAPI) => {
    try {
      const response = await axios.post(`${baseUrl}/pay`, payment_details, {
        withCredentials: true,
      });
      return response.data || response.data.message;
    } catch (error) {
      if (error.response) {
        const message = error.response.data.message;
        return thunkAPI.rejectWithValue(message);
      }
    }
  }
);

export const paymentSlice = createSlice({
  name: "pay",
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
    builder.addCase(MakeLoanPayment.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(MakeLoanPayment.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      if (action.payload && action.payload.message) {
        state.message = action.payload.message;
      }
      if (action.payload) {
        state.pay = action.payload;
      }
    });
    builder.addCase(MakeLoanPayment.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });
  },
});

export const { reset } = paymentSlice.actions;
export default paymentSlice.reducer;
