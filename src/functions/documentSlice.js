import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = "https://loan-server-jdbs.onrender.com/doc";

const initialState = {
  docs: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export async function AllMyDocuments() {
  try {
    return await axios.get(`${baseUrl}/all`, { withCredentials: true });
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function AllDocumentsByClient(client_uuid) {
  try {
    return await axios.get(`${baseUrl}/view/${client_uuid}`, {
      withCredentials: true,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export const AddMyDocuments = createAsyncThunk(
  "docs/AddMyDocuments",
  async (documents, thunkAPI) => {
    try {
      const response = await axios.post(`${baseUrl}/add`, documents, {
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

export const documentSlice = createSlice({
  name: "docs",
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
    builder.addCase(AddMyDocuments.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(AddMyDocuments.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      if (action.payload && action.payload.message) {
        state.message = action.payload.message;
      }
      if (action.payload) {
        state.docs = action.payload;
      }
    });
    builder.addCase(AddMyDocuments.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });
  },
});

export const { reset } = documentSlice.actions;
export default documentSlice.reducer;
