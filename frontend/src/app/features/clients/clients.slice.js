import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import clientsService from "./clients.service";

const initialState = {
  clients: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  errors: {},
  message: "",
};

// Fetch all clients
export const index = createAsyncThunk("fetch-clients", async (thunkAPI) => {
  try {
    return await clientsService.index();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

// Create client
export const create = createAsyncThunk(
  "create-client",
  async (service, thunkAPI) => {
    try {
      return await clientsService.create(service);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Update client
export const update = createAsyncThunk(
  "update-client",
  async (client, thunkAPI) => {
    try {
      return await clientsService.update(client);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Delete client
export const destroy = createAsyncThunk(
  "delete-client",
  async (id, thunkAPI) => {
    try {
      return await clientsService.destroy(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const clientsSlice = createSlice({
  name: "clients",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.errors = {};
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(index.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(index.fulfilled, (state, action) => {
        state.isLoading = false;
        state.clients = action.payload;
      })
      .addCase(index.rejected, (state, action) => {
        state.errors = action.payload.errors || {};
        state.message = action.payload.message;
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(create.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(create.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(create.rejected, (state, action) => {
        state.errors = action.payload.errors || {};
        state.message = action.payload.message;
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(update.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(update.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(update.rejected, (state, action) => {
        state.errors = action.payload.errors || {};
        state.message = action.payload.message;
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(destroy.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(destroy.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.clients = state.clients.filter(
          (client) => client.id !== action.payload
        );

        toast.success("Client deleted successfully!");
      })
      .addCase(destroy.rejected, (state, action) => {
        state.errors = action.payload.errors || {};
        state.message = action.payload.message;
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const { reset } = clientsSlice.actions;

export default clientsSlice.reducer;
