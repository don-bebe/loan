import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = "http://localhost:5050/package";

const initialState = {
  packages: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const CreateLoanPackage = createAsyncThunk(
  "package/CreateLoginPackage",
  async (package_details, thunkAPI) => {
    try {
      const response = await axios.post(`${baseUrl}/add`, package_details, {
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

export const UpdateLoanPackage = createAsyncThunk(
  "package/UpdateLoanPackage",
  async ({ id, package_details }, thunkAPI) => {
    try {
      const response = await axios.patch(
        `${baseUrl}/update/${id}`,
        package_details,
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

export async function AllLoanPackages() {
  try {
    return await axios.get(`${baseUrl}/all`, { withCredentials: true });
  } catch (error) {
    console.log(error);
  }
}

export async function PackagesCount() {
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


export async function AllLoanPackagesActive() {
  try {
    return await axios.get(`${baseUrl}/view`, { withCredentials: true });
  } catch (error) {
    console.log(error);
  }
}

export const loanPackageSlice = createSlice({
  name: "packages",
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
    builder.addCase(CreateLoanPackage.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(CreateLoanPackage.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      if (action.payload && action.payload.message) {
        state.message = action.payload.message;
      }
      if (action.payload) {
        state.packages = action.payload;
      }
    });
    builder.addCase(CreateLoanPackage.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    builder.addCase(UpdateLoanPackage.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(UpdateLoanPackage.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      if (action.payload && action.payload.message) {
        state.message = action.payload.message;
      }
      if (action.payload) {
        state.packages = action.payload;
      }
    });
    builder.addCase(UpdateLoanPackage.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });
  },
});

export const { reset } = loanPackageSlice.actions;
export default loanPackageSlice.reducer;
