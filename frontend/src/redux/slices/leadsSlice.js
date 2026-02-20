import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:8080";

export const fetchLeads = createAsyncThunk(
  "leads/fetchLeads",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_URL}/leads`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const addLead = createAsyncThunk(
  "leads/addLead",
  async (leadData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API_URL}/leads`, leadData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const updateLead = createAsyncThunk(
  "leads/updateLead",
  async (leadData, { rejectWithValue }) => {
    try {
      const res = await axios.put(`${API_URL}/leads/${leadData.id}`, leadData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const deleteLead = createAsyncThunk(
  "leads/deleteLead",
  async (leadId, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/leads/${leadId}`);
      return leadId;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const leadsSlice = createSlice({
  name: "leads",
  initialState: {
    leads: [],
    loading: false,
    error: null,
    success: false,
  },

  reducers: {
    resetStatus: (state) => {
      state.success = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(fetchLeads.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLeads.fulfilled, (state, action) => {
        state.loading = false;
        state.leads = action.payload;
      })
      .addCase(fetchLeads.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(addLead.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(addLead.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.leads.push(action.payload);
      })
      .addCase(addLead.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateLead.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(updateLead.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        const index = state.leads.findIndex(
          (lead) => lead.id === action.payload.id
        );
        if (index !== -1) {
          state.leads[index] = action.payload;
        }
      })
      .addCase(updateLead.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deleteLead.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(deleteLead.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.leads = state.leads.filter((lead) => lead.id !== action.payload);
      })
      .addCase(deleteLead.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetStatus } = leadsSlice.actions;
export default leadsSlice.reducer;
