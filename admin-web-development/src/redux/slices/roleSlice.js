import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

/* ================= MOCK STORAGE ================= */
let mockRoles = [];

/* ================= CREATE ================= */
export const addRole = createAsyncThunk(
  "roles/addRole",
  async (role, { rejectWithValue }) => {
    try {
      const newRole = {
        id: Date.now(),
        ...role,
      };
      mockRoles.push(newRole);
      return newRole;
    } catch (error) {
      return rejectWithValue("Failed to add role");
    }
  }
);

/* ================= FETCH ALL ================= */
export const fetchRoles = createAsyncThunk(
  "roles/fetchRoles",
  async (_, { rejectWithValue }) => {
    try {
      return mockRoles;
    } catch (error) {
      return rejectWithValue("Failed to fetch roles");
    }
  }
);

/* ================= FETCH BY ID ================= */
export const fetchRoleById = createAsyncThunk(
  "roles/fetchRoleById",
  async (id, { rejectWithValue }) => {
    try {
      const role = mockRoles.find((r) => r.id == id);
      if (!role) throw new Error();
      return role;
    } catch {
      return rejectWithValue("Role not found");
    }
  }
);

/* ================= UPDATE ================= */
export const updateRole = createAsyncThunk(
  "roles/updateRole",
  async ({ id, roleName, permissions }, { rejectWithValue }) => {
    try {
      const index = mockRoles.findIndex((r) => r.id == id);
      if (index === -1) throw new Error();

      mockRoles[index] = { id, roleName, permissions };
      return mockRoles[index];
    } catch {
      return rejectWithValue("Failed to update role");
    }
  }
);

/* ================= DELETE ================= */
export const deleteRole = createAsyncThunk(
  "roles/deleteRole",
  async (id, { rejectWithValue }) => {
    try {
      mockRoles = mockRoles.filter((r) => r.id !== id);
      return id;
    } catch {
      return rejectWithValue("Failed to delete role");
    }
  }
);

/* ================= SLICE ================= */
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

      /* ADD */
      .addCase(addRole.pending, (state) => {
        state.loading = true;
      })
      .addCase(addRole.fulfilled, (state, action) => {
        state.loading = false;
        state.roles.push(action.payload);
      })
      .addCase(addRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* FETCH ALL */
      .addCase(fetchRoles.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRoles.fulfilled, (state, action) => {
        state.loading = false;
        state.roles = action.payload;
      })
      .addCase(fetchRoles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* FETCH BY ID */
      .addCase(fetchRoleById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRoleById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedRole = action.payload;
      })
      .addCase(fetchRoleById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* UPDATE */
      .addCase(updateRole.fulfilled, (state, action) => {
        const index = state.roles.findIndex(
          (r) => r.id === action.payload.id
        );
        if (index !== -1) {
          state.roles[index] = action.payload;
        }
      })

      /* DELETE */
      .addCase(deleteRole.fulfilled, (state, action) => {
        state.roles = state.roles.filter(
          (r) => r.id !== action.payload
        );
      });
  },
});

export const { clearSelectedRole } = roleSlice.actions;

export default roleSlice.reducer;