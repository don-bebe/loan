import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = "http://localhost:5050/apply";

const initialState = {
  apply: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export async function AllMyLoanApplications() {
  try {
    return await axios.get(`${baseUrl}/view`, { withCredentials: true });
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function MyPaymentCalender() {
  try {
    return await axios.get(`${baseUrl}/calender`, { withCredentials: true });
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function MyLoanCount() {
  try {
    const response = await axios.get(`${baseUrl}/my`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function AllLoanCount() {
  try {
    const response = await axios.get(`${baseUrl}/count`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function AllLoanApplications() {
  try {
    return await axios.get(`${baseUrl}/all`, { withCredentials: true });
  } catch (error) {
    console.log(error);
  }
}

export async function AllPastLoanApplications(uuid) {
  try {
    return await axios.get(`${baseUrl}/view/${uuid}`, {
      withCredentials: true,
    });
  } catch (error) {
    console.log(error);
  }
}

export async function AllLoanAppType() {
  try {
    return await axios.get(`${baseUrl}/type`, { withCredentials: true });
  } catch (error) {
    console.log(error);
  }
}

export async function AllLoanAppClients() {
  try {
    return await axios.get(`${baseUrl}/client`, { withCredentials: true });
  } catch (error) {
    console.log(error);
  }
}

export async function WeeklyLoanedAverage() {
  try {
    return await axios.get(`${baseUrl}/weekly`, { withCredentials: true });
  } catch (error) {
    console.log(error);
  }
}

export async function MonthlyLoanedAverage() {
  try {
    return await axios.get(`${baseUrl}/monthly`, { withCredentials: true });
  } catch (error) {
    console.log(error);
  }
}

export const CreateLoanApplication = createAsyncThunk(
  "apply/CreateLoginApplication",
  async (application_details, thunkAPI) => {
    try {
      const response = await axios.post(`${baseUrl}/add`, application_details, {
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

export const CancelLoanApplication = createAsyncThunk(
  "apply/CancelLoanApplication",
  async ({ uuid, _ }, thunkAPI) => {
    try {
      const response = await axios.patch(`${baseUrl}/cancel/${uuid}`, _, {
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

export const ApproveLoanApplication = createAsyncThunk(
  "apply/ApproveLoanApplication",
  async ({ uuid, details }, thunkAPI) => {
    try {
      const response = await axios.patch(`${baseUrl}/edit/${uuid}`, details, {
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

export const loanApplySlice = createSlice({
  name: "apply",
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
    builder.addCase(CreateLoanApplication.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(CreateLoanApplication.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      if (action.payload && action.payload.message) {
        state.message = action.payload.message;
      }
      if (action.payload) {
        state.apply = action.payload;
      }
    });
    builder.addCase(CreateLoanApplication.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    builder.addCase(CancelLoanApplication.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(CancelLoanApplication.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      if (action.payload && action.payload.message) {
        state.message = action.payload.message;
      }
      if (action.payload) {
        state.apply = action.payload;
      }
    });
    builder.addCase(CancelLoanApplication.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    builder.addCase(ApproveLoanApplication.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(ApproveLoanApplication.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      if (action.payload && action.payload.message) {
        state.message = action.payload.message;
      }
      if (action.payload) {
        state.apply = action.payload;
      }
    });
    builder.addCase(ApproveLoanApplication.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });
  },
});

export const { reset } = loanApplySlice.actions;
export default loanApplySlice.reducer;
