import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:8082/api";

/* ================= COMMON ERROR NORMALIZER ================= */

const normalizeError = (payload) => {
  if (!payload) return "Something went wrong";
  if (typeof payload === "string") return payload;
  return payload?.message || payload?.error || "Something went wrong";
};

/* ================= THUNKS ================= */

// Fetch students (paginated)
export const fetchStudents = createAsyncThunk(
  "students/fetchAll",
  async ({ page = 1, size = 10 } = {}, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_URL}/students`, {
        params: { page, size },
      });
      return res.data; // { message, data, success }
    } catch (err) {
      console.log('Students rejected', err)
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Fetch student by ID
export const fetchStudentById = createAsyncThunk(
  "students/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_URL}/students/${id}`);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Add student
export const addStudent = createAsyncThunk(
  "students/add",
  async (studentData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API_URL}/students`, studentData);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Update student
export const updateStudent = createAsyncThunk(
  "students/updateStudent",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${API_URL}/students/${id}`,
        data
      );
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);


// Delete student
export const deleteStudent = createAsyncThunk(
  "students/delete",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/students/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Search students
export const searchStudents = createAsyncThunk(
  "students/search",
  async (term, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_URL}/students/search`, {
        params: { name: term }
      });
      return res.data.data?.content || [];
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

/* ================= SLICE ================= */

const studentSlice = createSlice({
  name: "students",
  initialState: {
    students: [],
    selectedStudent: null,
    loading: false,
    success: false,
    totalPages: 0,
    totalElements: 0,
    error: null,
  },
  reducers: {
    resetStatus: (state) => {
      state.success = false;
      state.error = null;
    },
    clearSelectedStudent: (state) => {
      state.selectedStudent = null;
    },
  },
  extraReducers: (builder) => {
    builder

      /* ================= FETCH ALL ================= */

      .addCase(fetchStudents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.loading = false;

        const data = action.payload?.data || {};

        state.students = data.content || [];
        state.totalPages = data.totalPages || 0;
        state.totalElements = data.totalElements || 0;
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.loading = false;
        state.error = normalizeError(action.payload);
      })

      /* ================= FETCH BY ID ================= */

      .addCase(fetchStudentById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStudentById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedStudent = action.payload;
      })
      .addCase(fetchStudentById.rejected, (state, action) => {
        state.loading = false;
        state.error = normalizeError(action.payload);
      })

      /* ================= ADD ================= */

      .addCase(addStudent.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(addStudent.fulfilled, (state, action) => {
        state.loading = false;
        state.students.unshift(action.payload); // show new at top
        state.success = true;
      })
      .addCase(addStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = normalizeError(action.payload);
      })

      /* ================= UPDATE ================= */

      .addCase(updateStudent.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(updateStudent.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.students.findIndex(
          (s) => s.id === action.payload.id
        );
        if (index !== -1) {
          state.students[index] = action.payload;
        }
        state.success = true;
      })
      .addCase(updateStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = normalizeError(action.payload);
      })

      /* ================= DELETE ================= */

      .addCase(deleteStudent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteStudent.fulfilled, (state, action) => {
        state.loading = false;
        state.students = state.students.filter(
          (s) => s.id !== action.payload
        );
        state.success = true;
      })
      .addCase(deleteStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = normalizeError(action.payload);
      })

      /* ================= SEARCH ================= */

      .addCase(searchStudents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchStudents.fulfilled, (state, action) => {
        state.loading = false;
        state.students = action.payload;
      })
      .addCase(searchStudents.rejected, (state, action) => {
        state.loading = false;
        state.error = normalizeError(action.payload);
      });
  },
});

export const { resetStatus, clearSelectedStudent } = studentSlice.actions;

export default studentSlice.reducer;
