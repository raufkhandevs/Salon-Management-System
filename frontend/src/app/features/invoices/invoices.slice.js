import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import invoicesService from "./invoices.service";

const initialState = {
  invoices: [],
  invoice: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  errors: {},
  message: "",
};

// Fetch all invoices
export const index = createAsyncThunk("fetch-invoices", async (thunkAPI) => {
  try {
    return await invoicesService.index();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

// Create invoice
export const create = createAsyncThunk(
  "create-invoice",
  async (invoice, thunkAPI) => {
    try {
      return await invoicesService.create(invoice);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Get invoice by id
export const show = createAsyncThunk("show-invoice", async (id, thunkAPI) => {
  try {
    return await invoicesService.show(id);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

// Update invoice
export const update = createAsyncThunk(
  "update-invoice",
  async (invoice, thunkAPI) => {
    try {
      return await invoicesService.update(invoice);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Delete invoice
export const destroy = createAsyncThunk(
  "delete-invoice",
  async (id, thunkAPI) => {
    try {
      return await invoicesService.destroy(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const invoiceslice = createSlice({
  name: "invoices",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.invoice = null;
      state.errors = {};
      state.message = "";
      state.invoice = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(index.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(index.fulfilled, (state, action) => {
        state.isLoading = false;
        state.invoices = action.payload;
      })
      .addCase(index.rejected, (state, action) => {
        state.errors = action.payload.errors || {};
        state.message = action.payload.message;
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(show.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(show.fulfilled, (state, action) => {
        state.isLoading = false;
        state.invoice = action.payload;
      })
      .addCase(show.rejected, (state, action) => {
        state.errors = action.payload.errors || {};
        state.message = action.payload.message;
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(create.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(create.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.invoices = [action.payload, ...state.invoices];
        state.invoice = action.payload;
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
        state.invoices = state.invoices.filter(
          (invoice) => invoice.id !== action.payload
        );

        toast.success("Invoice deleted successfully!");
      })
      .addCase(destroy.rejected, (state, action) => {
        state.errors = action.payload.errors || {};
        state.message = action.payload.message;
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const { reset } = invoiceslice.actions;

export default invoiceslice.reducer;
