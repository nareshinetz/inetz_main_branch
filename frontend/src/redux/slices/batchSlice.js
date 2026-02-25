import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:8082/api/batches";

/* =======================================================
   THUNKS
======================================================= */

// 🔹 Fetch All Batches
export const fetchBatches = createAsyncThunk(
  "batches/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(BASE_URL);
      return res.data.data; // ApiResponse -> data
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch batches"
      );
    }
  }
);

// 🔹 Fetch Batch By ID
export const fetchBatchById = createAsyncThunk(
  "batches/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BASE_URL}/${id}`);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch batch"
      );
    }
  }
);

// 🔹 Create Batch
export const createBatch = createAsyncThunk(
  "batches/create",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.post(BASE_URL, payload);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to create batch"
      );
    }
  }
);

// 🔹 Update Batch
export const updateBatch = createAsyncThunk(
  "batches/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await axios.put(`${BASE_URL}/${id}`, data);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to update batch"
      );
    }
  }
);

// 🔹 Delete Batch
export const deleteBatch = createAsyncThunk(
  "batches/delete",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${BASE_URL}/${id}`);
      return id; // return batchId
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to delete batch"
      );
    }
  }
);

// 🔹 Fetch Students By Batch
export const fetchStudentsByBatch = createAsyncThunk(
  "batches/fetchStudents",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BASE_URL}/${id}/students`);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch students"
      );
    }
  }
);

/* =======================================================
   SLICE
======================================================= */

const batchSlice = createSlice({
  name: "batches",
  initialState: {
    batches: [],
    selectedBatch: null,
    batchStudents: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearSelectedBatch: (state) => {
      state.selectedBatch = null;
    },
    clearBatchStudents: (state) => {
      state.batchStudents = [];
    },
  },
  extraReducers: (builder) => {
    builder

      /* ================= FETCH ALL ================= */
      .addCase(fetchBatches.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBatches.fulfilled, (state, action) => {
        state.loading = false;
        state.batches = action.payload || [];
      })
      .addCase(fetchBatches.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ================= FETCH BY ID ================= */
      .addCase(fetchBatchById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBatchById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedBatch = action.payload;
      })
      .addCase(fetchBatchById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ================= CREATE ================= */
      .addCase(createBatch.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBatch.fulfilled, (state, action) => {
        state.loading = false;
        state.batches.push(action.payload);
      })
      .addCase(createBatch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ================= UPDATE ================= */
      .addCase(updateBatch.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBatch.fulfilled, (state, action) => {
        state.loading = false;
        state.batches = state.batches.map((batch) =>
          batch.batchId === action.payload.batchId
            ? action.payload
            : batch
        );
      })
      .addCase(updateBatch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ================= DELETE ================= */
      .addCase(deleteBatch.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBatch.fulfilled, (state, action) => {
        state.loading = false;
        state.batches = state.batches.filter(
          (batch) => batch.batchId !== action.payload
        );
      })
      .addCase(deleteBatch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ================= STUDENTS BY BATCH ================= */
      .addCase(fetchStudentsByBatch.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStudentsByBatch.fulfilled, (state, action) => {
        state.loading = false;
        state.batchStudents = action.payload || [];
      })
      .addCase(fetchStudentsByBatch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearSelectedBatch, clearBatchStudents } =
  batchSlice.actions;

export default batchSlice.reducer;