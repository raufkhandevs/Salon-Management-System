import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import servicesService from "./services.service";

const initialState = {
  services: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  errors: {},
  message: "",
};

// Fetch all services
export const index = createAsyncThunk("fetch-services", async (thunkAPI) => {
  try {
    return await servicesService.index();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

// Create service
export const create = createAsyncThunk(
  "create-service",
  async (service, thunkAPI) => {
    try {
      return await servicesService.create(service);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Update service
export const update = createAsyncThunk(
  "update-service",
  async (service, thunkAPI) => {
    try {
      return await servicesService.update(service);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Delete service
export const destroy = createAsyncThunk(
  "delete-service",
  async (id, thunkAPI) => {
    try {
      return await servicesService.destroy(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const serviceSlice = createSlice({
  name: "services",
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
        const services = action.payload.map((service) => {
          service.groupName = service.group.name;
          return service;
        });
        state.services = services;
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
        state.services = state.services.filter(
          (service) => service.id !== action.payload
        );

        toast.success("Service deleted successfully!");
      })
      .addCase(destroy.rejected, (state, action) => {
        state.errors = action.payload.errors || {};
        state.message = action.payload.message;
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const { reset } = serviceSlice.actions;

export default serviceSlice.reducer;
