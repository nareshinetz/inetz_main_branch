import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Grid,
  Button,
  MenuItem,
  Alert,
  CircularProgress,
} from "@mui/material";
import { School as SchoolIcon } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Breadcrumbs, Link } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import {
  addCourse,
  editCourse,
  fetchCourseById,
} from "../redux/slices/courseSlice";

const instructorOptions = [
  "John Doe",
  "Vijay Kumar",
  "Priya Sharma",
  "Raj Patel",
];

const initialState = {
  courseName: "",
  courseCode: "",
  price: "",
  instructor: "",
  duration: "",
};

const AddCourse = () => {
  const { id } = useParams();
  const isEditMode = Boolean(id);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { selectedCourse, loading, error } = useSelector(
    (state) => state.courses
  );

  const [formData, setFormData] = useState(initialState);
  const [formErrors, setFormErrors] = useState({});
  const [success, setSuccess] = useState(false);

  /* ================= FETCH COURSE (EDIT MODE) ================= */
  useEffect(() => {
    if (isEditMode) {
      dispatch(fetchCourseById(id));
    }
  }, [dispatch, id, isEditMode]);

  /* ================= PREFILL FORM ================= */
  useEffect(() => {
    if (isEditMode && selectedCourse) {
      setFormData({
        courseName: selectedCourse.courseName || "",
        courseCode: selectedCourse.courseCode || "",
        price: selectedCourse.price || "",
        instructor: selectedCourse.instructor || "",
        duration: selectedCourse.duration || "",
      });
    }
  }, [selectedCourse, isEditMode]);

  /* ================= HANDLE CHANGE ================= */
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "price" || name === "duration"
          ? Number(value)
          : value,
    }));

    setFormErrors((prev) => ({ ...prev, [name]: false }));
  };

  /* ================= VALIDATION ================= */
  const validateForm = () => {
    const errors = {};

    Object.keys(formData).forEach((key) => {
      if (!formData[key]) errors[key] = true;
    });

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      if (isEditMode) {
        await dispatch(editCourse({ id, ...formData })).unwrap();
      } else {
        await dispatch(addCourse(formData)).unwrap();
      }

      setSuccess(true);
      setTimeout(() => navigate("/courses/list"), 1200);
    } catch (err) {
      console.error(err);
    }
  };

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={6}>
        <CircularProgress />
      </Box>
    );
  }

  /* ================= SUCCESS ================= */
  if (success) {
    return (
      <Alert severity="success" sx={{ maxWidth: 500, mx: "auto", mt: 6 }}>
        {isEditMode
          ? "Course Updated Successfully!"
          : "Course Added Successfully!"}
      </Alert>
    );
  }

  /* ================= UI ================= */

  return (<>
    <Box>
      <Typography variant="h5" fontWeight={700} mb={3}>
        {isEditMode ? "Edit Course" : "Add New Course"}
      </Typography>



      <Card sx={{ borderRadius: 3 }}>
        <CardContent sx={{ p: { xs: 4, sm: 4, md: 5 } }}>

          <form onSubmit={handleSubmit}>
            <Grid container spacing={3} sx={{ width: '100%', maxWidth: '100%' }}>
              {[
                { label: "Course Name", name: "courseName" },
                { label: "Course Code", name: "courseCode" },
              ].map((field) => (
                <Grid item xs={12} md={4} sx={{ width: '30%' }} key={field.name}>
                  <TextField
                    label={`${field.label} *`}
                    name={field.name}
                    fullWidth
                    value={formData[field.name]}
                    onChange={handleChange}
                    error={formErrors[field.name]}
                  />
                </Grid>
              ))}

              <Grid item xs={12} md={4} sx={{ width: '30%' }}>
                <TextField
                  label="Course Fees *"
                  name="price"
                  type="number"
                  fullWidth
                  value={formData.price}
                  onChange={handleChange}
                  error={formErrors.price}
                />
              </Grid>

              <Grid item xs={12} md={4} sx={{ width: '30%' }}>
                {/* <TextField
                  select
                  label="Trainer *"
                  name="instructor"
                  fullWidth
                  value={formData.instructor}
                  onChange={handleChange}
                  error={formErrors.instructor}
                >
                  {instructorOptions.map((opt) => (
                    <MenuItem key={opt} value={opt}>
                      {opt}
                    </MenuItem>
                  ))}
                </TextField> */}
              </Grid>

              <Grid item xs={12} md={4} sx={{ width: '30%' }}>
                {/* <TextField
                  label="Duration (Months) *"
                  name="duration"
                  type="number"
                  fullWidth
                  value={formData.duration}
                  onChange={handleChange}
                  error={formErrors.duration}
                /> */}


              </Grid>
              <Grid item xs={12} md={4} sx={{ width: '30%' }}>
                <Box
                  sx={{
                    height: '100%',
                    display: "flex",
                    flexDirection: "row-reverse",
                    gap: 2,
                    justifyContent: "center"
                  }}
                >
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    fullWidth
                    sx={{
                      borderRadius: 2,
                      py: 1.5,
                      boxShadow: "0 8px 24px rgba(25,118,210,0.35)",
                      fontWeight: 700,
                      "&:hover": {
                        boxShadow: "0 12px 32px rgba(25,118,210,0.45)",
                      },
                    }}
                  >
                    {isEditMode ? "Update Student" : "SAVE"}
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    color="error"
                    fullWidth
                    onClick={() => navigate("/students/addpayment")}
                    sx={{
                      borderRadius: 2,
                      py: 1.5,
                      borderWidth: 2,
                      fontWeight: 600,
                      "&:hover": {
                        borderWidth: 2,
                      },
                    }}
                  >
                    Cancel
                  </Button>
                </Box>
              </Grid>
            </Grid>


          </form>

          {error && (
            <Alert severity="error" sx={{ mt: 3 }}>
              {error}
            </Alert>
          )}
        </CardContent>
      </Card>
    </Box>
  </>
  );
};

export default AddCourse;
