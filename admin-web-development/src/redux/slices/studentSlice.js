import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:8080";

/* ================= THUNKS ================= */

// Fetch students
export const fetchStudents = createAsyncThunk(
  "students/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_URL}/students`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Add student
export const addStudent = createAsyncThunk(
  "students/add",
  async (studentData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API_URL}/students`, studentData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Edit student
export const editStudent = createAsyncThunk(
  "students/edit",
  async (student, { rejectWithValue }) => {
    try {
      const res = await axios.put(
        `${API_URL}/students/${student.id}`,
        student
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.message);
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
      return rejectWithValue(err.message);
    }
  }
);

/* ================= SLICE ================= */

const studentSlice = createSlice({
  name: "students",
  initialState: {
    students: [],
    loading: false,
    success: false,
    error: null,
  },
  reducers: {
    resetStatus: (state) => {
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder

      /* FETCH */
      .addCase(fetchStudents.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.loading = false;
        state.students = action.payload;
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ADD */
      .addCase(addStudent.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(addStudent.fulfilled, (state, action) => {
        state.loading = false;
        state.students.push(action.payload);
        state.success = true;
      })
      .addCase(addStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* EDIT */
      .addCase(editStudent.fulfilled, (state, action) => {
        const index = state.students.findIndex(
          (s) => s.id === action.payload.id
        );
        if (index !== -1) {
          state.students[index] = action.payload;
        }
        state.success = true;
        state.loading = false;
      })

      /* DELETE */
      .addCase(deleteStudent.fulfilled, (state, action) => {
        state.students = state.students.filter(
          (s) => s.id !== action.payload
        );
        state.success = true;
        state.loading = false;
      });
  },
});

export const { resetStatus } = studentSlice.actions;
export default studentSlice.reducer;
