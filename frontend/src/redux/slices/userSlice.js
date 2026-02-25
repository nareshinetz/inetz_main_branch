import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const BASE_URL = "http://localhost:8082/users";

// ============================
// Async Thunks
// ============================

export const fetchUsers = createAsyncThunk(
  "users/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(BASE_URL);
      return response.data.data || [];
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error fetching users"
      );
    }
  }
);

export const fetchUserById = createAsyncThunk(
  "users/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/${id}`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "User not found"
      );
    }
  }
);

export const createUser = createAsyncThunk(
  "users/create",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/create`, userData);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Create failed"
      );
    }
  }
);

export const updateUser = createAsyncThunk(
  "users/update",
  async ({ id, userData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${BASE_URL}/${id}`, userData);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Update failed"
      );
    }
  }
);

export const deleteUser = createAsyncThunk(
  "users/delete",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${BASE_URL}/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Delete failed"
      );
    }
  }
);

// ============================
// Slice
// ============================

const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    selectedUser: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.selectedUser = action.payload;
      })

      .addCase(createUser.fulfilled, (state, action) => {
        state.users.push(action.payload);
      })

      .addCase(updateUser.fulfilled, (state, action) => {
        const index = state.users.findIndex(
          (u) => u.id === action.payload.id
        );
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      })

      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter(
          (user) => user.id !== action.payload
        );
      });
  },
});

export default userSlice.reducer;