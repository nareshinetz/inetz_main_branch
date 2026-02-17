import React, { useEffect, useMemo } from "react";
import {
  Box,
  Typography,
  Alert,
  CircularProgress,
  Card,
  CardContent,
  Button,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourses, deleteCourse } from "../redux/slices/courseSlice";
import AgGridTable from "../generic/AgGridTable";
import { useNavigate } from "react-router-dom";
import DownloadDropdown from "../generic/DropDown";

const ListCourses = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  

  const { courses = [], loading, error } = useSelector(
    (state) => state.courses
  );

  /* ================= FETCH COURSES ================= */
  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  /* ================= HANDLERS ================= */
  const handleEdit = (id) => {
    navigate(`/courses/edit/${id}`);
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this course?")) {
      dispatch(deleteCourse(id));
    }
  };

  /* ================= TABLE COLUMNS ================= */
  const courseColumns = useMemo(
    () => [
      { headerName: "ID", field: "id", width: 100 },

      {
        headerName: "Course Name",
        field: "courseName",
        flex: 1,
        filter: true,
      },

      {
        headerName: "Duration (Months)",
        field: "duration",
        width: 160,
      },

      {
        headerName: "Total Fee",
        field: "price",
        width: 150,
        valueFormatter: (params) =>
          params.value ? `₹${params.value}` : "₹0",
      },

      {
        headerName: "Instructor",
        field: "instructor",
        width: 180,
      },

      {
        headerName: "Actions",
        width: 140,
        cellRenderer: (params) => (
          <Box display="flex" gap={1}>
            <IconButton
              size="small"
              color="primary"
              onClick={() => handleEdit(params.data.id)}
            >
              <EditIcon />
            </IconButton>

            <IconButton
              size="small"
              color="error"
              onClick={() => handleDelete(params.data.id)}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        ),
      },
    ],
    []
  );

  /* ================= DOWNLOAD CONFIG ================= */
  const downloadColumns = useMemo(
    () => [
      { header: "Course Name", key: "courseName", width: 30 },
      { header: "Duration", key: "duration", width: 20 },
      { header: "Total Fee", key: "totalFee", width: 20 },
      { header: "Instructor", key: "instructor", width: 25 },
    ],
    []
  );

  /* ================= STATES ================= */

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" minHeight={300}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error">
        Failed to load courses: {error}
      </Alert>
    );
  }

  /* ================= UI ================= */

  return (
    <Card sx={{ borderRadius: 3 }}>
      <CardContent>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={3}
        >
          <Typography variant="h5" fontWeight={600}>
            Courses List
          </Typography>

          <Box display="flex" gap={2}>
            <DownloadDropdown
              data={courses}
              columns={downloadColumns}
              fileName="courses_list"
              sheetName="Courses"
              title="COURSES REPORT"
            />

            <Button
              variant="contained"
              onClick={() => navigate("/courses/add")}
            >
              Add Course
            </Button>
          </Box>
        </Box>

        <AgGridTable
          rowData={courses}
          columnDefs={courseColumns}
          loadingMessage="Fetching courses..."
        />
      </CardContent>
    </Card>
  );
};

export default ListCourses;
