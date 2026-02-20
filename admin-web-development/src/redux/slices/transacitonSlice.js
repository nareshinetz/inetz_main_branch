import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:8082/payment";

/* ================= FETCH ================= */
export const fetchTransactions = createAsyncThunk(
  "transactions/fetch",
  async ({ page = 1, size = 10 } = {}) => {
    const res = await axios.get(`${API_URL}/all?page=${page}&size=${size}`);
    // Map paymentId → id for AgGrid table actions
    return res.data.data.content.map((t) => ({
      ...t,
      id: t.paymentId,              // important for table actions
      totalFees: t.totalFees || "-",  // default if missing
      pendingAmount: t.pendingAmount || "-", // default if missing
      status: t.status || "Completed",
      paymentMode: t.paymentMode || "-",
    }));
  }
);

export const fetchTransactionById = createAsyncThunk(
  "transactions/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_URL}/${id}`);
      const t = res.data.data;

      return {
        ...t,
        id: t.paymentId,
        totalFees: t.totalFees ?? "-",
        pendingAmount: t.pendingAmount ?? "-",
        status: t.status ?? "Completed",
        paymentMode: t.paymentMode ?? "-",
      };
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const fetchStudentTransactions = createAsyncThunk(
  "transactions/fetchStudentTransactions",
  async (studentId, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${API_URL}/student/${studentId}`
      );

      const data = res.data?.data || [];

      return data.map((t) => ({
        ...t,
        id: t.paymentId,
        totalFees: t.totalFees ?? "-",
        pendingAmount: t.pendingAmount ?? "-",
        status: t.status ?? "Completed",
        paymentMode: t.paymentMode ?? "-",
      }));
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);



/* ================= ADD ================= */
export const addTransaction = createAsyncThunk(
  "transactions/addTransaction",
  async (paymentData, { rejectWithValue }) => {
    try {
      const res = await axios.post(API_URL, paymentData);
      const t = res.data.data;
      return {
        ...t,
        id: t.paymentId,
        totalFees: t.totalFees || "-",
        pendingAmount: t.pendingAmount || "-",
        status: t.status || "Completed",
        paymentMode: t.paymentMode || "-",
      };
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

/* ================= DELETE ================= */
export const deleteTransaction = createAsyncThunk(
  "transactions/deleteTransaction",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

/* ================= SLICE ================= */
const transactionSlice = createSlice({
  name: "transactions",
  initialState: {
    transactions: [],
    selectedTransaction: null,
    studentTransactions: [],

    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      /* FETCH */
      .addCase(fetchTransactions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions = action.payload;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      .addCase(fetchTransactionById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTransactionById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedTransaction = action.payload;
      })
      .addCase(fetchTransactionById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      .addCase(fetchStudentTransactions.pending, (state) => {
  state.loading = true;
})
.addCase(fetchStudentTransactions.fulfilled, (state, action) => {
  state.loading = false;
  state.studentTransactions = action.payload;
})
.addCase(fetchStudentTransactions.rejected, (state, action) => {
  state.loading = false;
  state.error = action.payload || action.error.message;
})

      /* ADD */
      .addCase(addTransaction.pending, (state) => {
        state.loading = true;
      })
    .addCase(addTransaction.fulfilled, (state, action) => {
      state.loading = false;
      state.transactions.push(action.payload);
    })
    .addCase(addTransaction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || action.error.message;
    })

    /* DELETE */
    .addCase(deleteTransaction.fulfilled, (state, action) => {
      state.transactions = state.transactions.filter(
        (t) => String(t.id) !== String(action.payload)
      );
    });
},
});

export default transactionSlice.reducer;
