import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import groupsService from "./groups.service";

const initialState = {
  groups: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  errors: {},
  message: "",
};

// Fetch all groups
export const index = createAsyncThunk("fetch-groups", async (thunkAPI) => {
  try {
    return await groupsService.index();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

// Create group
export const create = createAsyncThunk(
  "create-group",
  async (group, thunkAPI) => {
    try {
      return await groupsService.create(group);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Update group
export const update = createAsyncThunk(
  "update-group",
  async (group, thunkAPI) => {
    try {
      return await groupsService.update(group);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Delete group
export const destroy = createAsyncThunk(
  "delete-group",
  async (id, thunkAPI) => {
    try {
      return await groupsService.destroy(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const groupslice = createSlice({
  name: "groups",
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
        state.groups = action.payload;
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
        state.groups = state.groups.filter(
          (group) => group.id !== action.payload
        );

        toast.success("Group deleted successfully!");
      })
      .addCase(destroy.rejected, (state, action) => {
        state.errors = action.payload.errors || {};
        state.message = action.payload.message;
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const { reset } = groupslice.actions;

export default groupslice.reducer;
