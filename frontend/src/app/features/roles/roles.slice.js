import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import rolesService from "./roles.service";

const initialState = {
  roles: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  errors: {},
  message: "",
};

// Fetch all roles
export const index = createAsyncThunk("fetch-roles", async (thunkAPI) => {
  try {
    return await rolesService.index();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

// Create role
export const create = createAsyncThunk(
  "create-role",
  async (role, thunkAPI) => {
    try {
      return await rolesService.create(role);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Update user
export const update = createAsyncThunk(
  "update-role",
  async (role, thunkAPI) => {
    try {
      return await rolesService.update(role);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Delete role
export const destroy = createAsyncThunk("delete-role", async (id, thunkAPI) => {
  try {
    return await rolesService.destroy(id);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const rolesSlice = createSlice({
  name: "roles",
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
        state.roles = action.payload;
      })
      .addCase(index.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message;
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
        state.roles = state.roles.filter((role) => role.id !== action.payload);

        toast.success("Role deleted successfully!");
      })
      .addCase(destroy.rejected, (state, action) => {
        state.errors = action.payload.errors || {};
        state.message = action.payload.message;
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const { reset } = rolesSlice.actions;

export default rolesSlice.reducer;
