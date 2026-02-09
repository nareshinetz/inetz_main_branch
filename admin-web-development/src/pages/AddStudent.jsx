import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Alert,
  MenuItem,
  CircularProgress,
  Typography,
  TextField,
  Grid,
  Button,
  Stack,
} from "@mui/material";
import {
  Person as PersonIcon,
  SignalWifiStatusbarConnectedNoInternet4Sharp,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addStudent } from "../redux/slices/studentSlice";
import Status from "../generic/StatusModel";
import { useParams } from "react-router-dom";
import { fetchStudentById, updateStudent } from "../redux/slices/studentSlice";


const inputStyle = {
  "& .MuiOutlinedInput-root": {
    borderRadius: 2,
    bgcolor: "white",
    minHeight: 56,
    "& fieldset": {
      borderColor: "grey.300",
      borderWidth: 1.5,
    },
    "&:hover fieldset": {
      borderColor: "primary.main",
    },
    "&.Mui-focused fieldset": {
      borderWidth: 2,
    },
  },
  "& .MuiInputLabel-root": {
    fontWeight: 500,
    fontSize: "0.95rem",
  },
  "& .MuiInputBase-input": {
    fontSize: "0.95rem",
    padding: "16.5px 14px",
  },
  "& .MuiSelect-select": {
    paddingTop: "16.5px",
    paddingBottom: "16.5px",
  },
};

const selectProps = {
  MenuProps: {
    PaperProps: {
      sx: {
        maxHeight: 300,
        mt: 1,
        boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
        borderRadius: 2,
        "& .MuiMenuItem-root": {
          fontSize: "0.95rem",
          py: 1.5,
          px: 2,
          "&:hover": {
            bgcolor: "primary.50",
          },
          "&.Mui-selected": {
            bgcolor: "primary.100",
            fontWeight: 600,
            "&:hover": {
              bgcolor: "primary.200",
            },
          },
        },
      },
    },
  },
};

const AddStudent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const isEditMode = Boolean(id);

  const { students, loading, error } = useSelector(
  (state) => state.students
);

const [statusModal, setStatusModal] = useState({
  open: false,
  type: "success",
  title: "",
  message: "",
});



const [formData, setFormData] = useState({
  studentName: "",
  emailId: "",
  phoneNumber: "",
  programType: "",
  modeOfTraining: "",
  courseName: "",
  trainerName: "",
  collegeName: "",
  degree: "",
  department: "",
  cityName: "",
  yearOfStudy: "",
  sslcMark: "",
  hscMark: "",
  ugMark: "",
  pgMark: "",
  status: "",
  comments: "",
});


useEffect(() => {
  if (isEditMode && students.length > 0) {
    const student = students.find((s) => String(s.id) === String(id));
    if (student) {
      setFormData(student);
    }
  }
}, [isEditMode, id, students]);


  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");
  // dropdown options
  const programOptions = ["Internship", "Course"];
  const modeOptions = ["Online", "Offline"];
  const timingOptions = ["8am-9am", "9am-10am", "10am-11am", "2pm-3pm"];
  const yearOptions = ["1st Yr", "2nd Yr", "3rd Yr", "Final Yr", "Passed Out"];
  const statusOptions = ["Active", "Completed", "Dropped"];
  const courseOptions = [
    "Java Full Stack",
    "MERN Stack",
    "Python Full Stack",
    "Data Science",
    "Data Analytics",
    "Embedded",
    "IoT",
  ];
  const courseFeeMap = {
    "Java Full Stack": 60000,
    "MERN Stack": 65000,
    "Python Full Stack": 55000,
    "Data Science": 80000,
    "Data Analytics": 70000,
    "Embedded": 50000,
    "IoT": 45000,
  };
  const batchOptions = ["Batch 1", "Batch 2", "Batch 3"];
  const trainerOptions = ["John", "Vijay", "Priya"];

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      let updated = { ...prev, [name]: value };

      // Auto set total fee when course changes
      // if (name === "courseName") {
      //   const fee = courseFeeMap[value] || 0;
      //   updated.totalFee = fee;
      //   updated.paidAmount = "";
      //   updated.pendingFee = fee;
      // }

      // Paid amount change
      // if (name === "paidAmount") {
      //   const total = Number(prev.totalFee || 0);
      //   const paid = Number(value || 0);
      //   updated.pendingFee = total - paid;
      // }

      return updated;
    });

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: false }));
    }
  };

  const requiredFields = [
    "studentName",
    "emailId",
    "phoneNumber",
    "programType",
    "modeOfTraining",
    "courseName",
    "status",
  ];

  const validateForm = () => {
    const newErrors = {};

    requiredFields.forEach((field) => {
      if (!formData[field]?.toString().trim()) {
        newErrors[field] = true;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validateForm()) return;

  try {
    let resultStudent;

    if (isEditMode) {
      resultStudent = await dispatch(
        updateStudent({ id, ...formData })
      ).unwrap();
    } else {
      resultStudent = await dispatch(addStudent(formData)).unwrap();
    }

    setStatusModal({
      open: true,
      type: "success",
      title: isEditMode
        ? "Student Updated Successfully"
        : "Student Added Successfully",
      message: "Student information has been saved successfully.",
      studentId: resultStudent.id, // ✅ store ID here
    });
  } catch (err) {
    setStatusModal({
      open: true,
      type: "error",
      title: "Submission Failed",
      message: "Failed to save student. Please try again.",
    });
  }
};

  if (loading && !students.length)
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="300px">
        <CircularProgress />
      </Box>
    );

  if (error)
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="300px">
        <Alert severity="error" sx={{ width: "100%", maxWidth: 400 }}>
          Failed to add student: {error}
        </Alert>
      </Box>
    );

  return (
    <Box>
      {/* Page Header */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h5"
          fontWeight={700}
          sx={{
            mb: 1,
            background: "linear-gradient(135deg, #1a1a1a 0%, #4a4a4a 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
           {isEditMode ? "Edit Student" : "Add New Student"}
        </Typography>
      </Box>

      <Card
        elevation={0}
        sx={{
          borderRadius: 3,
          border: "1px solid",
          borderColor: "divider",
          overflow: "hidden",
        }}
      >
        <CardContent sx={{ p: { xs: 4, sm: 4, md: 5 } }}>
          <form onSubmit={handleSubmit}>
            {/* Single Section Header */}
            <Box sx={{ mb: 4, display: "flex", alignItems: "center", gap: 2 }}>
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: 2,
                  bgcolor: "primary.50",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <PersonIcon sx={{ color: "primary.main", fontSize: 24 }} />
              </Box>
              <Box>
                <Typography variant="h6" fontWeight={700}>
                  Student Information
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Fill all fields to complete enrollment
                </Typography>
              </Box>
            </Box>

            {/* 3-Column Grid Layout */}
            <Grid container spacing={3} sx={{ width: '100%', maxWidth: '100%' }}>
              {/* Column 1: Personal & Basic Info */}
              <Grid item xs={12} md={4} sx={{ width: '30%' }}>
                <Stack spacing={3}>
                  <TextField
                    label="Student Name *"
                    name="studentName"
                    fullWidth
                    required
                    value={formData.studentName}
                    onChange={handleChange}
                    error={errors.studentName}
                    sx={inputStyle}
                  />
                  <TextField
                    select
                    label="Program Type"
                    name="programType"
                    fullWidth
                    value={formData.programType}
                    onChange={handleChange}
                    error={errors.programType}
                    SelectProps={selectProps}
                    sx={inputStyle}
                  >
                    {programOptions.map((opt) => (
                      <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    label="College Name"
                    name="collegeName"
                    fullWidth
                    value={formData.collegeName}
                    onChange={handleChange}
                    error={errors.collegeName}
                    sx={inputStyle}
                  />
                  <TextField
                    label="City Name"
                    name="cityName"
                    fullWidth
                    value={formData.cityName}
                    onChange={handleChange}
                    error={errors.cityName}
                    sx={inputStyle}
                  />
                  <TextField
                    type="number"
                    label="HSC Mark (%)"
                    name="hscMark"
                    fullWidth
                    value={formData.hscMark}
                    onChange={handleChange}
                    error={errors.hscMark}
                    inputProps={{ min: 0, max: 600, step: 0.01 }}
                    sx={inputStyle}
                  />
                  <TextField
                    select
                    label="Status"
                    name="status"
                    fullWidth
                    value={formData.status}
                    onChange={handleChange}
                    error={errors.status}
                    SelectProps={selectProps}
                    sx={inputStyle}
                  >
                    {statusOptions.map((opt) => (
                      <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                    ))}
                  </TextField>


                </Stack>
              </Grid>

              {/* Column 2: Education & Academic */}
              <Grid item xs={12} md={4} sx={{ width: '30%' }}>
                <Stack spacing={3}>
                  <TextField
                    label="Email ID *"
                    name="emailId"
                    type="email"
                    fullWidth
                    required
                    value={formData.emailId}
                    onChange={handleChange}
                    error={errors.emailId}
                    sx={inputStyle}
                  />
                  <TextField
                    select
                    label="Mode of Training"
                    name="modeOfTraining"
                    fullWidth
                    value={formData.modeOfTraining}
                    onChange={handleChange}
                    error={errors.modeOfTraining}
                    SelectProps={selectProps}
                    sx={inputStyle}
                  >
                    {modeOptions.map((opt) => (
                      <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                    ))}
                  </TextField>


                  <TextField
                    label="Department"
                    name="department"
                    fullWidth
                    value={formData.department}
                    onChange={handleChange}
                    error={errors.department}
                    sx={inputStyle}
                  />

                  <TextField
                    select
                    label="Year of Study"
                    name="yearOfStudy"
                    fullWidth
                    value={formData.yearOfStudy}
                    onChange={handleChange}
                    error={errors.yearOfStudy}
                    SelectProps={selectProps}
                    sx={inputStyle}
                  >
                    {yearOptions.map((opt) => (
                      <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    type="number"
                    label="UG Mark (CGPA)"
                    name="ugMark"
                    fullWidth
                    value={formData.ugMark}
                    onChange={handleChange}
                    error={errors.ugMark}
                    inputProps={{ min: 0, max: 10, step: 0.01 }}
                    sx={inputStyle}
                  />
                  <TextField
                    label="Additional Comments"
                    name="comments"
                    fullWidth
                    rows={1}
                    value={formData.comments}
                    onChange={handleChange}
                    error={errors.comments}
                    placeholder="Enter any additional notes or comments about the student..."
                    sx={{ width: 790 }}
                  />

                </Stack>
              </Grid>

              {/* Column 3: Marks & Status */}
              <Grid item xs={12} md={4} sx={{ width: '30%' }}>
                <Stack spacing={3}>

                  <TextField
                    label="Phone Number *"
                    name="phoneNumber"
                    fullWidth
                    required
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    error={errors.phoneNumber}
                    sx={inputStyle}
                  />
                  <TextField
                    select
                    label="Course Name"
                    name="courseName"
                    fullWidth
                    value={formData.courseName}
                    onChange={handleChange}
                    error={errors.courseName}
                    SelectProps={selectProps}
                    sx={inputStyle}
                  >
                    {courseOptions.map((opt) => (
                      <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    label="Degree"
                    name="degree"
                    fullWidth
                    value={formData.degree}
                    onChange={handleChange}
                    error={errors.degree}
                    sx={inputStyle}
                  />
                  <TextField
                    type="number"
                    label="SSLC Mark (%)"
                    name="sslcMark"
                    fullWidth
                    value={formData.sslcMark}
                    onChange={handleChange}
                    error={errors.sslcMark}
                    inputProps={{ min: 0, max: 500, step: 0.01 }}
                    sx={inputStyle}
                  />


                  <TextField
                    type="number"
                    label="PG Mark (CGPA)"
                    name="pgMark"
                    fullWidth
                    value={formData.pgMark}
                    onChange={handleChange}
                    error={errors.pgMark}
                    inputProps={{ min: 0, max: 10, step: 0.01 }}
                    sx={inputStyle}
                  />

                  {/* <TextField
                    label="Total Fee"
                    name="totalFee"
                    type="number"
                    fullWidth
                    disabled
                    value={formData.totalFee}
                    onChange={handleChange}
                    error={errors.totalFee}
                    sx={inputStyle}
                  /> */}
                </Stack>
              </Grid>
            </Grid>

            {/* Comments and Action Buttons Row */}
            <Box sx={{ mt: 4 }}>
              <Grid container spacing={3}>

                {/* Column 3: Action Buttons */}
                <Grid item xs={12} md={4}>
                  <Box
                    sx={{
                      height: '100%',
                      width: 1180,
                      display: "flex",
                      flexDirection: "row-reverse",
                      gap: 2,
                      justifyContent: "right",
                    }}
                  >
                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
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
                      {isEditMode ? "Update Student" : "Submit"}
                    </Button>
                    <Button
                      variant="outlined"
                      size="large"
                      color="error"
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
            </Box>
          </form>
        </CardContent>
      </Card>

      <Status
  open={statusModal.open}
  type={statusModal.type}
  title={statusModal.title}
  message={statusModal.message}
  onClose={() => {
    const studentId = statusModal.studentId;

    setStatusModal({ ...statusModal, open: false });

    if (statusModal.type === "success" && studentId) {
      navigate("/addpayment", {
        state: {
          studentId: studentId, // ✅ dynamic ID
        },
      });
    }
  }}
/>


    </Box>
  );
};

export default AddStudent;


// import React, { useEffect, useState, useMemo, useCallback } from "react";
// import {
//   Box,
//   Card,
//   CardContent,
//   Alert,
//   MenuItem,
//   CircularProgress,
//   Typography,
//   TextField,
//   Grid,
//   Button,
//   Stack,
// } from "@mui/material";
// import { Person as PersonIcon } from "@mui/icons-material";
// import { useNavigate, useParams } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { addStudent, fetchStudentById, updateStudent } from "../redux/slices/studentSlice";
// import Status from "../generic/StatusModel";

// // ========== CONSTANTS ==========
// const PROGRAM_OPTIONS = ["Internship", "Course"];
// const MODE_OPTIONS = ["Online", "Offline"];
// const YEAR_OPTIONS = ["1st Yr", "2nd Yr", "3rd Yr", "Final Yr", "Passed Out"];
// const STATUS_OPTIONS = ["Active", "Completed", "Dropped"];
// const COURSE_OPTIONS = [
//   "Java Full Stack",
//   "MERN Stack",
//   "Python Full Stack",
//   "Data Science",
//   "Data Analytics",
//   "Embedded",
//   "IoT",
// ];

// const REQUIRED_FIELDS = [
//   "studentName",
//   "emailId",
//   "phoneNumber",
//   "programType",
//   "modeOfTraining",
//   "courseName",
//   "status",
// ];

// // ========== STYLES ==========
// const inputStyle = {
//   "& .MuiOutlinedInput-root": {
//     borderRadius: 2,
//     bgcolor: "white",
//     minHeight: 56,
//     "& fieldset": {
//       borderColor: "grey.300",
//       borderWidth: 1.5,
//     },
//     "&:hover fieldset": {
//       borderColor: "primary.main",
//     },
//     "&.Mui-focused fieldset": {
//       borderWidth: 2,
//     },
//   },
//   "& .MuiInputLabel-root": {
//     fontWeight: 500,
//     fontSize: "0.95rem",
//   },
//   "& .MuiInputBase-input": {
//     fontSize: "0.95rem",
//     padding: "16.5px 14px",
//   },
//   "& .MuiSelect-select": {
//     paddingTop: "16.5px",
//     paddingBottom: "16.5px",
//   },
// };

// const selectProps = {
//   MenuProps: {
//     PaperProps: {
//       sx: {
//         maxHeight: 300,
//         mt: 1,
//         boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
//         borderRadius: 2,
//         "& .MuiMenuItem-root": {
//           fontSize: "0.95rem",
//           py: 1.5,
//           px: 2,
//           "&:hover": {
//             bgcolor: "primary.50",
//           },
//           "&.Mui-selected": {
//             bgcolor: "primary.100",
//             fontWeight: 600,
//             "&:hover": {
//               bgcolor: "primary.200",
//             },
//           },
//         },
//       },
//     },
//   },
// };

// // ========== HELPER FUNCTIONS ==========
// const getInitialFormData = () => ({
//   studentName: "",
//   emailId: "",
//   phoneNumber: "",
//   programType: "",
//   modeOfTraining: "",
//   courseName: "",
//   trainerName: "",
//   collegeName: "",
//   degree: "",
//   department: "",
//   cityName: "",
//   yearOfStudy: "",
//   sslcMark: "",
//   hscMark: "",
//   ugMark: "",
//   pgMark: "",
//   status: "",
//   comments: "",
// });

// // ========== CUSTOM COMPONENTS ==========
// const FormTextField = React.memo(({ error, ...props }) => (
//   <TextField {...props} error={error} sx={inputStyle} />
// ));

// const FormSelectField = React.memo(({ options, error, ...props }) => (
//   <TextField select {...props} error={error} SelectProps={selectProps} sx={inputStyle}>
//     {options.map((opt) => (
//       <MenuItem key={opt} value={opt}>
//         {opt}
//       </MenuItem>
//     ))}
//   </TextField>
// ));

// // ========== MAIN COMPONENT ==========
// const AddStudent = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { id } = useParams();
//   const isEditMode = Boolean(id);

//   // Redux state
//   const { students, loading, error } = useSelector((state) => state.students);

//   // Local state
//   const [formData, setFormData] = useState(getInitialFormData);
//   const [errors, setErrors] = useState({});
//   const [statusModal, setStatusModal] = useState({
//     open: false,
//     type: "success",
//     title: "",
//     message: "",
//   });

//   // ========== EFFECTS ==========
//   // Load student data in edit mode
//   useEffect(() => {
//     if (isEditMode && students.length > 0) {
//       const student = students.find((s) => String(s.id) === String(id));
//       if (student) {
//         setFormData(student);
//       }
//     }
//   }, [isEditMode, id, students]);

//   // ========== HANDLERS ==========
//   const handleChange = useCallback((e) => {
//     const { name, value } = e.target;

//     setFormData((prev) => ({ ...prev, [name]: value }));

//     // Clear error for this field
//     setErrors((prev) => {
//       if (prev[name]) {
//         const newErrors = { ...prev };
//         delete newErrors[name];
//         return newErrors;
//       }
//       return prev;
//     });
//   }, []);

//   const validateForm = useCallback(() => {
//     const newErrors = {};

//     REQUIRED_FIELDS.forEach((field) => {
//       if (!formData[field]?.toString().trim()) {
//         newErrors[field] = true;
//       }
//     });

//     // Additional email validation
//     if (formData.emailId && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.emailId)) {
//       newErrors.emailId = true;
//     }

//     // Phone number validation (basic)
//     if (formData.phoneNumber && !/^\d{10}$/.test(formData.phoneNumber.replace(/\D/g, ""))) {
//       newErrors.phoneNumber = true;
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   }, [formData]);

//   const handleSubmit = useCallback(
//     async (e) => {
//       e.preventDefault();

//       if (!validateForm()) {
//         return;
//       }

//       try {
//         let resultStudent;

//         if (isEditMode) {
//           resultStudent = await dispatch(updateStudent({ id, ...formData })).unwrap();
//         } else {
//           resultStudent = await dispatch(addStudent(formData)).unwrap();
//         }

//         setStatusModal({
//           open: true,
//           type: "success",
//           title: isEditMode ? "Student Updated Successfully" : "Student Added Successfully",
//           message: "Student information has been saved successfully.",
//           studentId: resultStudent.id,
//         });
//       } catch (err) {
//         setStatusModal({
//           open: true,
//           type: "error",
//           title: "Submission Failed",
//           message: err.message || "Failed to save student. Please try again.",
//         });
//       }
//     },
//     [validateForm, isEditMode, dispatch, id, formData]
//   );

//   const handleCancel = useCallback(() => {
//     navigate("/students/addpayment");
//   }, [navigate]);

//   const handleStatusClose = useCallback(() => {
//     const studentId = statusModal.studentId;
//     setStatusModal((prev) => ({ ...prev, open: false }));

//     if (statusModal.type === "success" && studentId) {
//       navigate("/addpayment", {
//         state: { studentId },
//       });
//     }
//   }, [statusModal.studentId, statusModal.type, navigate]);

//   // ========== LOADING & ERROR STATES ==========
//   if (loading && !students.length) {
//     return (
//       <Box display="flex" justifyContent="center" alignItems="center" minHeight="300px">
//         <CircularProgress />
//       </Box>
//     );
//   }

//   if (error) {
//     return (
//       <Box display="flex" justifyContent="center" alignItems="center" minHeight="300px">
//         <Alert severity="error" sx={{ width: "100%", maxWidth: 400 }}>
//           Failed to load student: {error}
//         </Alert>
//       </Box>
//     );
//   }

//   // ========== RENDER ==========
//   return (
//     <Box sx={{ width: '100%' }}>
//       {/* Page Header */}
//       <Box sx={{ mb: 4 }}>
//         <Typography
//           variant="h5"
//           fontWeight={700}
//           sx={{
//             mb: 1,
//             background: "linear-gradient(135deg, #1a1a1a 0%, #4a4a4a 100%)",
//             WebkitBackgroundClip: "text",
//             WebkitTextFillColor: "transparent",
//           }}
//         >
//           {isEditMode ? "Edit Student" : "Add New Student"}
//         </Typography>
//       </Box>

//       <Card
//         elevation={0}
//         sx={{
//           borderRadius: 3,
//           border: "1px solid",
//           borderColor: "divider",
//           overflow: "hidden",
//           width: '100%',
//         }}
//       >
//         <CardContent sx={{ p: { xs: 3, sm: 4, md: 5 }, width: '100%' }}>
//           <form onSubmit={handleSubmit} style={{ width: '100%' }}>
//             {/* Section Header */}
//             <Box sx={{ mb: 4, display: "flex", alignItems: "center", gap: 2 }}>
//               <Box
//                 sx={{
//                   width: 48,
//                   height: 48,
//                   borderRadius: 2,
//                   bgcolor: "primary.50",
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                 }}
//               >
//                 <PersonIcon sx={{ color: "primary.main", fontSize: 24 }} />
//               </Box>
//               <Box>
//                 <Typography variant="h6" fontWeight={700}>
//                   Student Information
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   Fill all required fields to complete enrollment
//                 </Typography>
//               </Box>
//             </Box>

//             {/* Form Grid - Full Width Layout */}
//             <Grid container spacing={3} sx={{ width: '100%', m: 0 }}>
//               {/* Row 1: Student Name, Email ID, Phone Number */}
//               <Grid item xs={12} md={4} sx={{ pl: 0 }}>
//                 <FormTextField
//                   label="Student Name * *"
//                   name="studentName"
//                   fullWidth
//                   required
//                   value={formData.studentName}
//                   onChange={handleChange}
//                   error={errors.studentName}
//                 />
//               </Grid>
//               <Grid item xs={12} md={4}>
//                 <FormTextField
//                   label="Email ID * *"
//                   name="emailId"
//                   type="email"
//                   fullWidth
//                   required
//                   value={formData.emailId}
//                   onChange={handleChange}
//                   error={errors.emailId}
//                   helperText={errors.emailId && "Please enter a valid email"}
//                 />
//               </Grid>
//               <Grid item xs={12} md={4}>
//                 <FormTextField
//                   label="Phone Number * *"
//                   name="phoneNumber"
//                   fullWidth
//                   required
//                   value={formData.phoneNumber}
//                   onChange={handleChange}
//                   error={errors.phoneNumber}
//                   helperText={errors.phoneNumber && "Please enter a valid 10-digit phone number"}
//                 />
//               </Grid>

//               {/* Row 2: Program Type, Mode of Training, Course Name */}
//               <Grid item xs={12} md={4} sx={{ pl: 0 }}>
//                 <FormSelectField
//                   label="Program Type"
//                   name="programType"
//                   fullWidth
//                   required
//                   value={formData.programType}
//                   onChange={handleChange}
//                   error={errors.programType}
//                   options={PROGRAM_OPTIONS}
//                 />
//               </Grid>
//               <Grid item xs={12} md={4}>
//                 <FormSelectField
//                   label="Mode of Training"
//                   name="modeOfTraining"
//                   fullWidth
//                   required
//                   value={formData.modeOfTraining}
//                   onChange={handleChange}
//                   error={errors.modeOfTraining}
//                   options={MODE_OPTIONS}
//                 />
//               </Grid>
//               <Grid item xs={12} md={4}>
//                 <FormSelectField
//                   label="Course Name"
//                   name="courseName"
//                   fullWidth
//                   required
//                   value={formData.courseName}
//                   onChange={handleChange}
//                   error={errors.courseName}
//                   options={COURSE_OPTIONS}
//                 />
//               </Grid>

//               {/* Row 3: College Name, Department, Degree */}
//               <Grid item xs={12} md={4} sx={{ pl: 0 }}>
//                 <FormTextField
//                   label="College Name"
//                   name="collegeName"
//                   fullWidth
//                   value={formData.collegeName}
//                   onChange={handleChange}
//                   error={errors.collegeName}
//                 />
//               </Grid>
//               <Grid item xs={12} md={4}>
//                 <FormTextField
//                   label="Department"
//                   name="department"
//                   fullWidth
//                   value={formData.department}
//                   onChange={handleChange}
//                   error={errors.department}
//                 />
//               </Grid>
//               <Grid item xs={12} md={4}>
//                 <FormTextField
//                   label="Degree"
//                   name="degree"
//                   fullWidth
//                   value={formData.degree}
//                   onChange={handleChange}
//                   error={errors.degree}
//                 />
//               </Grid>

//               {/* Row 4: City Name, Year of Study, SSLC Mark */}
//               <Grid item xs={12} md={4} sx={{ pl: 0 }}>
//                 <FormTextField
//                   label="City Name"
//                   name="cityName"
//                   fullWidth
//                   value={formData.cityName}
//                   onChange={handleChange}
//                   error={errors.cityName}
//                 />
//               </Grid>
//               <Grid item xs={12} md={4}>
//                 <FormSelectField
//                   label="Year of Study"
//                   name="yearOfStudy"
//                   fullWidth
//                   value={formData.yearOfStudy}
//                   onChange={handleChange}
//                   error={errors.yearOfStudy}
//                   options={YEAR_OPTIONS}
//                 />
//               </Grid>
//               <Grid item xs={12} md={4}>
//                 <FormTextField
//                   type="number"
//                   label="SSLC Mark (%)"
//                   name="sslcMark"
//                   fullWidth
//                   value={formData.sslcMark}
//                   onChange={handleChange}
//                   error={errors.sslcMark}
//                   inputProps={{ min: 0, max: 100, step: 0.01 }}
//                 />
//               </Grid>

//               {/* Row 5: HSC Mark, UG Mark, PG Mark */}
//               <Grid item xs={12} md={4} sx={{ pl: 0 }}>
//                 <FormTextField
//                   type="number"
//                   label="HSC Mark (%)"
//                   name="hscMark"
//                   fullWidth
//                   value={formData.hscMark}
//                   onChange={handleChange}
//                   error={errors.hscMark}
//                   inputProps={{ min: 0, max: 100, step: 0.01 }}
//                 />
//               </Grid>
//               <Grid item xs={12} md={4}>
//                 <FormTextField
//                   type="number"
//                   label="UG Mark (CGPA)"
//                   name="ugMark"
//                   fullWidth
//                   value={formData.ugMark}
//                   onChange={handleChange}
//                   error={errors.ugMark}
//                   inputProps={{ min: 0, max: 10, step: 0.01 }}
//                 />
//               </Grid>
//               <Grid item xs={12} md={4}>
//                 <FormTextField
//                   type="number"
//                   label="PG Mark (CGPA)"
//                   name="pgMark"
//                   fullWidth
//                   value={formData.pgMark}
//                   onChange={handleChange}
//                   error={errors.pgMark}
//                   inputProps={{ min: 0, max: 10, step: 0.01 }}
//                 />
//               </Grid>

//               {/* Row 6: Status, Additional Comments (spans 2 columns) */}
//               <Grid item xs={12} md={4} sx={{ pl: 0 }}>
//                 <FormSelectField
//                   label="Status"
//                   name="status"
//                   fullWidth
//                   required
//                   value={formData.status}
//                   onChange={handleChange}
//                   error={errors.status}
//                   options={STATUS_OPTIONS}
//                 />
//               </Grid>
//               <Grid item xs={12} md={8}>
//                 <FormTextField
//                   label="Additional Comments"
//                   name="comments"
//                   fullWidth
//                   multiline
//                   rows={1}
//                   value={formData.comments}
//                   onChange={handleChange}
//                   placeholder="Enter any additional notes..."
//                 />
//               </Grid>
//             </Grid>

//             {/* Action Buttons */}
//             <Box sx={{ mt: 4, display: "flex", justifyContent: "flex-end", gap: 2 }}>
//               <Button
//                 variant="outlined"
//                 size="large"
//                 color="error"
//                 onClick={handleCancel}
//                 sx={{
//                   borderRadius: 2,
//                   py: 1.5,
//                   px: 4,
//                   borderWidth: 2,
//                   fontWeight: 600,
//                   "&:hover": {
//                     borderWidth: 2,
//                   },
//                 }}
//               >
//                 Cancel
//               </Button>
//               <Button
//                 type="submit"
//                 variant="contained"
//                 size="large"
//                 disabled={loading}
//                 sx={{
//                   borderRadius: 2,
//                   py: 1.5,
//                   px: 4,
//                   boxShadow: "0 8px 24px rgba(25,118,210,0.35)",
//                   fontWeight: 700,
//                   "&:hover": {
//                     boxShadow: "0 12px 32px rgba(25,118,210,0.45)",
//                   },
//                 }}
//               >
//                 {loading ? (
//                   <CircularProgress size={24} color="inherit" />
//                 ) : isEditMode ? (
//                   "Update Student"
//                 ) : (
//                   "Submit"
//                 )}
//               </Button>
//             </Box>
//           </form>
//         </CardContent>
//       </Card>

//       <Status
//         open={statusModal.open}
//         type={statusModal.type}
//         title={statusModal.title}
//         message={statusModal.message}
//         onClose={handleStatusClose}
//       />
//     </Box>
//   );
// };

// export default AddStudent;  