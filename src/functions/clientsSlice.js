import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = "https://loan-server-jdbs.onrender.com/clients";

const initialState = {
  clients: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const CreateIndividualClient = createAsyncThunk(
  "clients/CreateIndividualClient",
  async (individual_details, thunkAPI) => {
    try {
      const response = await axios.post(`${baseUrl}/add`, individual_details, {
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

export const UpdateIndividualClient = createAsyncThunk(
  "clients/UpdateIndividualClient",
  async ({ uuid, individual_details }, thunkAPI) => {
    try {
      const response = await axios.patch(
        `${baseUrl}/update/${uuid}`,
        individual_details,
        {
          withCredentials: true,
        }
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

export async function AllIndividualClients() {
  try {
    return await axios.get(`${baseUrl}/all`, { withCredentials: true });
  } catch (error) {
    console.log(error);
  }
}

export async function ClientsCount() {
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

export const CreateBusinessClient = createAsyncThunk(
  "clients/CreateBusinessClient",
  async (business_details, thunkAPI) => {
    try {
      const response = await axios.post(`${baseUrl}/addNew`, business_details, {
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

export const UpdateBusinessClient = createAsyncThunk(
  "clients/UpdateBusinessClient",
  async ({ uuid, business_details }, thunkAPI) => {
    try {
      const response = await axios.patch(
        `${baseUrl}/edit/${uuid}`,
        business_details,
        {
          withCredentials: true,
        }
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

export async function AllBusinessClients() {
  try {
    return await axios.get(`${baseUrl}/viewAll`, { withCredentials: true });
  } catch (error) {
    console.log(error);
  }
}

export const clientsSlice = createSlice({
  name: "clients",
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
    builder.addCase(CreateIndividualClient.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(CreateIndividualClient.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      if (action.payload && action.payload.message) {
        state.message = action.payload.message;
      }
      if (action.payload) {
        state.clients = action.payload;
      }
    });
    builder.addCase(CreateIndividualClient.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    builder.addCase(UpdateIndividualClient.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(UpdateIndividualClient.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      if (action.payload && action.payload.message) {
        state.message = action.payload.message;
      }
      if (action.payload) {
        state.clients = action.payload;
      }
    });
    builder.addCase(UpdateIndividualClient.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    builder.addCase(CreateBusinessClient.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(CreateBusinessClient.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      if (action.payload && action.payload.message) {
        state.message = action.payload.message;
      }
      if (action.payload) {
        state.clients = action.payload;
      }
    });
    builder.addCase(CreateBusinessClient.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    builder.addCase(UpdateBusinessClient.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(UpdateBusinessClient.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      if (action.payload && action.payload.message) {
        state.message = action.payload.message;
      }
      if (action.payload) {
        state.clients = action.payload;
      }
    });
    builder.addCase(UpdateBusinessClient.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });
  },
});

export const { reset } = clientsSlice.actions;
export default clientsSlice.reducer;
