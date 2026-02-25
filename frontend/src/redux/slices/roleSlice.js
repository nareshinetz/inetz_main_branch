import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

/* ================= BASE URL ================= */
const BASE_URL = "http://localhost:8082/api/roles";

/* ================= CREATE ROLE ================= */
export const addRole = createAsyncThunk(
  "roles/create",
  async (role, { rejectWithValue }) => {
    try {
      const res = await fetch(`${BASE_URL}/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(role),
      });
      if (!res.ok) throw new Error("Failed to create role");
      return await res.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/* ================= FETCH ALL ROLES ================= */
export const fetchRoles = createAsyncThunk(
  "roles/fetchRoles",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(BASE_URL);
      if (!res.ok) throw new Error("Failed to fetch roles");
      return await res.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/* ================= FETCH ROLE BY ID ================= */
export const fetchRoleById = createAsyncThunk(
  "roles/fetchRoleById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await fetch(`${BASE_URL}/${id}`);
      if (!res.ok) throw new Error("Role not found");
      return await res.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/* ================= UPDATE ROLE ================= */
export const updateRole = createAsyncThunk(
  "roles/updateRole",
  async ({ id, roleData }, { rejectWithValue }) => {
    try {
      const res = await fetch(`${BASE_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(roleData),
      });
      if (!res.ok) throw new Error("Failed to update role");
      return await res.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/* ================= DELETE ROLE ================= */
export const deleteRole = createAsyncThunk(
  "roles/deleteRole",
  async (id, { rejectWithValue }) => {
    try {
      const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete role");
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/* ================= ROLE SLICE ================= */
const roleSlice = createSlice({
  name: "roles",
  initialState: {
    roles: [],
    selectedRole: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearSelectedRole: (state) => {
      state.selectedRole = null;
    },
  },
  extraReducers: (builder) => {
    builder
      /* ===== CREATE ===== */
      .addCase(addRole.pending, (state) => { state.loading = true; })
      .addCase(addRole.fulfilled, (state, action) => {
        state.loading = false;
        state.roles.push(action.payload);
      })
      .addCase(addRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ===== FETCH ALL ===== */
      .addCase(fetchRoles.pending, (state) => { state.loading = true; })
      .addCase(fetchRoles.fulfilled, (state, action) => {
        state.loading = false;
        state.roles = action.payload;
      })
      .addCase(fetchRoles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ===== FETCH BY ID ===== */
      .addCase(fetchRoleById.pending, (state) => { state.loading = true; })
      .addCase(fetchRoleById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedRole = action.payload;
      })
      .addCase(fetchRoleById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ===== UPDATE ===== */
      .addCase(updateRole.pending, (state) => { state.loading = true; })
      .addCase(updateRole.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.roles.findIndex(r => r.id === action.payload.id);
        if (index !== -1) state.roles[index] = action.payload;
      })
      .addCase(updateRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ===== DELETE ===== */
      .addCase(deleteRole.pending, (state) => { state.loading = true; })
      .addCase(deleteRole.fulfilled, (state, action) => {
        state.loading = false;
        state.roles = state.roles.filter(r => r.id !== action.payload);
      })
      .addCase(deleteRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearSelectedRole } = roleSlice.actions;

export default roleSlice.reducer;