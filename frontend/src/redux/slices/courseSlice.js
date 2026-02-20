// redux/slices/courseSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:8082/course";

/* ================= FETCH COURSES ================= */
export const fetchCourses = createAsyncThunk(
  "courses",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_URL}/courses`);
      return res.data; // backend wrapper object
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

// Fetch Single Course
export const fetchCourseById = createAsyncThunk(
  "courses/fetchCourseById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_URL}/courses/${id}`);
      return res.data.data; // assuming backend returns { message, data, success }
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);


/* ================= ADD COURSE ================= */
export const addCourse = createAsyncThunk(
  "/courses",
  async (courseData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API_URL}/courses`, courseData);
      return res.data; // wrapper object
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

/* ================= EDIT COURSE ================= */
export const editCourse = createAsyncThunk(
  "courses/editCourse",
  async (updatedCourseData, { rejectWithValue }) => {
    try {
      const res = await axios.put(
        `${API_URL}/courses/${updatedCourseData.id}`,
        updatedCourseData
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

/* ================= DELETE COURSE ================= */
export const deleteCourse = createAsyncThunk(
  "courses/deleteCourse",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/courses/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

/* ================= SLICE ================= */
const courseSlice = createSlice({
  name: "courses",
  initialState: {
    courses: [],
    selectedCourse: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      /* ===== FETCH ===== */
      .addCase(fetchCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = action.payload.data; // ✅ IMPORTANT FIX
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ===== ADD ===== */
      .addCase(addCourse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addCourse.fulfilled, (state, action) => {
        state.loading = false;
        state.courses.push(action.payload.data); // ✅ FIX
      })
      .addCase(addCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch Course By ID
      .addCase(fetchCourseById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCourseById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedCourse = action.payload;
      })
      .addCase(fetchCourseById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })


      /* ===== EDIT ===== */
      .addCase(editCourse.fulfilled, (state, action) => {
        const updatedCourse = action.payload.data;

        const index = state.courses.findIndex(
          (course) => course.id === updatedCourse.id
        );

        if (index !== -1) {
          state.courses[index] = updatedCourse;
        }
      })

      /* ===== DELETE ===== */
      .addCase(deleteCourse.fulfilled, (state, action) => {
        state.courses = state.courses.filter(
          (course) => course.id !== action.payload
        );
      });
  },
});

export default courseSlice.reducer;
