import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import staffService from "./staff.service";

const initialState = {
  users: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  errors: {},
  message: "",
};

// Fetch all users
export const index = createAsyncThunk("fetch-users", async (thunkAPI) => {
  try {
    return await staffService.index();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

// Create user
export const create = createAsyncThunk(
  "create-user",
  async (user, thunkAPI) => {
    try {
      return await staffService.create(user);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Update user
export const update = createAsyncThunk(
  "update-user",
  async (user, thunkAPI) => {
    try {
      return await staffService.update(user);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Delete user
export const destroy = createAsyncThunk("delete-user", async (id, thunkAPI) => {
  try {
    return await staffService.destroy(id);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const staffSlice = createSlice({
  name: "staff",
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
        state.users = action.payload;
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
        state.users = state.users.filter((user) => user.id !== action.payload);

        toast.success("Staff member deleted successfully!");
      })
      .addCase(destroy.rejected, (state, action) => {
        state.errors = action.payload.errors || {};
        state.message = action.payload.message;
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const { reset } = staffSlice.actions;

export default staffSlice.reducer;
