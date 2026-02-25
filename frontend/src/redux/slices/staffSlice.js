  import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
  import axios from "axios";

  const API_URL = "http://localhost:8082/api";

  /* =========================
    THUNKS
  ========================= */

  // Fetch all staff
  export const fetchStaff = createAsyncThunk(
    "staff/fetchStaff",
    async (_, { rejectWithValue }) => {
      try {
        const res = await axios.get(`${API_URL}/staff`);
        return res.data.data;
      } catch (err) {
        return rejectWithValue(
          err.response?.data?.message || err.message || "Failed to fetch staff"
        );
      }
    }
  );

  // Add new staff
  export const addStaff = createAsyncThunk(
    "staff/addStaff",
    async (staffData, { rejectWithValue }) => {
      try {
        const res = await axios.post(`${API_URL}/staff`, staffData);
        return res.data.data; // ✅ IMPORTANT FIX
      } catch (err) {
        return rejectWithValue(
          err.response?.data?.message || err.message
        );
      }
    }
  );

  // Edit staff
  export const editStaff = createAsyncThunk(
    "staff/editStaff",
    async (updatedStaffData, { rejectWithValue }) => {
      try {
        const res = await axios.put(
          `${API_URL}/staff/${updatedStaffData.id}`,
          updatedStaffData
        );
        return res.data.data; // return updated object
      } catch (err) {
        return rejectWithValue(
          err.response?.data?.message || err.message || "Failed to update staff"
        );
      }
    }
  );

  // Delete staff
  export const deleteStaff = createAsyncThunk(
    "staff/deleteStaff",
    async (id, { rejectWithValue }) => {
      try {
        await axios.delete(`${API_URL}/staff/${id}`);
        return id; // return deleted id
      } catch (err) {
        return rejectWithValue(
          err.response?.data?.message || err.message || "Failed to delete staff"
        );
      }
    }
  );

  /* =========================
    SLICE
  ========================= */

  const staffSlice = createSlice({
    name: "staff",
    initialState: {
      staff: [],
      loading: false,
      error: null,
      success: false,
    },
    reducers: {
      clearStaffError: (state) => {
        state.error = null;
      },
      resetStaffSuccess: (state) => {
        state.success = false;
      },
    },
    extraReducers: (builder) => {
      builder

        /* ===== FETCH ===== */
        .addCase(fetchStaff.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchStaff.fulfilled, (state, action) => {
          state.loading = false;
          state.staff = action.payload;// ✅ FIXED
        })
        .addCase(fetchStaff.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })

        /* ===== ADD ===== */
        .addCase(addStaff.pending, (state) => {
          state.loading = true;
          state.error = null;
          state.success = false;
        })
        .addCase(addStaff.fulfilled, (state, action) => {
          state.loading = false;
          state.staff.push(action.payload);
          state.success = true;
        })
        .addCase(addStaff.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })

        /* ===== EDIT ===== */
        .addCase(editStaff.pending, (state) => {
          state.loading = true;
          state.error = null;
          state.success = false;
        })
        .addCase(editStaff.fulfilled, (state, action) => {
          state.loading = false;

          const index = state.staff.findIndex(
            (member) => member.id === action.payload.id
          );

          if (index !== -1) {
            state.staff[index] = action.payload;
          }

          state.success = true;
        })
        .addCase(editStaff.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })

        /* ===== DELETE ===== */
        .addCase(deleteStaff.pending, (state) => {
          state.loading = true;
          state.error = null;
          state.success = false;
        })
        .addCase(deleteStaff.fulfilled, (state, action) => {
          state.loading = false;

          state.staff = state.staff.filter(
            (member) => member.id !== action.payload
          );

          state.success = true;
        })
        .addCase(deleteStaff.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
    },
  });

  /* =========================
    EXPORTS
  ========================= */

  export const { clearStaffError, resetStaffSuccess } = staffSlice.actions;
  export default staffSlice.reducer;
