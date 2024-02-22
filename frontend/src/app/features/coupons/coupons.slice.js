import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import couponsService from "./coupons.service";

const initialState = {
  coupons: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  errors: {},
  message: "",
};

// Fetch all coupons
export const index = createAsyncThunk("fetch-coupons", async (thunkAPI) => {
  try {
    return await couponsService.index();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

// Create coupon
export const create = createAsyncThunk(
  "create-coupon",
  async (coupon, thunkAPI) => {
    try {
      return await couponsService.create(coupon);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Update service
export const update = createAsyncThunk(
  "update-coupon",
  async (coupon, thunkAPI) => {
    try {
      return await couponsService.update(coupon);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Delete coupon
export const destroy = createAsyncThunk(
  "delete-coupon",
  async (id, thunkAPI) => {
    try {
      return await couponsService.destroy(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const couponsSlice = createSlice({
  name: "coupons",
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
        state.coupons = action.payload;
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
        state.coupons = state.coupons.filter(
          (coupon) => coupon.id !== action.payload
        );

        toast.success("Coupon deleted successfully!");
      })
      .addCase(destroy.rejected, (state, action) => {
        state.errors = action.payload.errors || {};
        state.message = action.payload.message;
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const { reset } = couponsSlice.actions;

export default couponsSlice.reducer;
