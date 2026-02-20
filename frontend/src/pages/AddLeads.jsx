import React, { useState } from "react";
import { Box, Card, MenuItem, Alert, CircularProgress } from "@mui/material";
import CustomInput from "../generic/Input";
import CustomButton from "../generic/Button";
import CustomTypography from "../generic/Typography";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addLead } from "../redux/slices/leadsSlice";
import FormContainer from "../generic/FormContainer";

const AddLead = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.leads);

  const [formData, setFormData] = useState({
    studentName: "",
    emailId: "",
    phoneNumber: "",
    programType: "",
    typeOfCourse: "",
    source: "",
    city: "",
    degree: "",
    collegeName: "",
    status: "",
    reminderDate: "",
    comments: "",
  });

  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);

  const programOptions = ["Internship", "Course"];
  const courseOptions = [
    "Java Full Stack",
    "MERN Stack",
    "Python",
    "Data Science",
    "Data Analytics",
    "Embedded",
    "IoT",
  ];
  const sourceOptions = [
    "Direct Walk-In",
    "Google",
    "Facebook/Instagram",
    "LinkedIn",
    "Reference",
  ];
  const degreeOptions = ["B.Tech/BE", "B.Com", "Others"];
  const statusOptions = [
    "New",
    "Interested",
    "Not Interested",
    "Not Attended",
    "Follow-Up",
    "Enrolled",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: false }));
  };

  const validateForm = () => {
    const newErrors = {};
    Object.entries(formData).forEach(([key, value]) => {
      if (
        [
          "studentName",
          "emailId",
          "phoneNumber",
          "programType",
          "typeOfCourse",
          "city",
          "source",
          "degree",
          "collegeName",
          "status",
        ].includes(key) &&
        !value.trim()
      ) {
        newErrors[key] = true;
      }
    });

    if (formData.degree === "Others" && !formData.otherDegree.trim()) {
      newErrors.otherDegree = true;
    }
    if (
      ["Interested", "Follow-Up"].includes(formData.status) &&
      !formData.reminderDate.trim()
    ) {
      newErrors.reminderDate = true;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await dispatch(addLead(formData)).unwrap();
        setShowSuccess(true);
        setTimeout(() => navigate("/leads/list"), 1500);
      } catch (err) {
        console.error("Failed to add lead:", err);
      }
    }
  };

  if (loading)
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="300px"
      >
        <CircularProgress />
      </Box>
    );

  if (showSuccess)
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="300px"
      >
        <Alert severity="success" sx={{ width: "100%", maxWidth: 400 }}>
          Lead Added Successfully! Redirecting...
        </Alert>
      </Box>
    );

  if (error)
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="300px"
      >
        <Alert severity="error" sx={{ width: "100%", maxWidth: 400 }}>
          Failed to add lead: {error}
        </Alert>
      </Box>
    );

  return (
    <Box>
      <Card sx={{ p: 4 }}>
        <form onSubmit={handleSubmit}>
          <FormContainer>
            <CustomInput
              label="Student Name"
              name="studentName"
              value={formData.studentName}
              onChange={handleChange}
              error={errors.studentName}
              required
            />
            <CustomInput
              label="Email ID"
              name="emailId"
              type="email"
              value={formData.emailId}
              onChange={handleChange}
              error={errors.emailId}
              required
            />
            <CustomInput
              label="Phone Number"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              error={errors.phoneNumber}
              required
            />

            <CustomInput
              select
              label="Program Type"
              name="programType"
              value={formData.programType}
              onChange={handleChange}
              error={errors.programType}
              required
            >
              {programOptions.map((opt) => (
                <MenuItem key={opt} value={opt}>
                  {opt}
                </MenuItem>
              ))}
            </CustomInput>

            <CustomInput
              select
              label="Type of Course"
              name="typeOfCourse"
              value={formData.typeOfCourse}
              onChange={handleChange}
              error={errors.typeOfCourse}
              required
            >
              {courseOptions.map((opt) => (
                <MenuItem key={opt} value={opt}>
                  {opt}
                </MenuItem>
              ))}
            </CustomInput>

            <CustomInput
              select
              label="Source"
              name="source"
              value={formData.source}
              onChange={handleChange}
              error={errors.source}
              required
            >
              {sourceOptions.map((opt) => (
                <MenuItem key={opt} value={opt}>
                  {opt}
                </MenuItem>
              ))}
            </CustomInput>

            <CustomInput
              label="City"
              name="city"
              value={formData.city}
              onChange={handleChange}
              error={errors.city}
              required
            />

            <CustomInput
              select
              label="Degree"
              name="degree"
              value={formData.degree}
              onChange={handleChange}
              error={errors.degree}
              required
            >
              {degreeOptions.map((opt) => (
                <MenuItem key={opt} value={opt}>
                  {opt}
                </MenuItem>
              ))}
            </CustomInput>

            {formData.degree === "Others" && (
              <CustomInput
                label="Specify Degree"
                name="degree"
                onChange={handleChange}
                error={errors.degree}
                required
              />
            )}

            <CustomInput
              label="College Name"
              name="collegeName"
              value={formData.collegeName}
              onChange={handleChange}
              error={errors.collegeName}
              required
            />

            <CustomInput
              select
              label="Status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              error={errors.status}
              required
            >
              {statusOptions.map((opt) => (
                <MenuItem key={opt} value={opt}>
                  {opt}
                </MenuItem>
              ))}
            </CustomInput>

            {["Interested", "Follow-Up"].includes(formData.status) && (
              <CustomInput
                type="date"
                label="Reminder Date"
                name="reminderDate"
                value={formData.reminderDate}
                onChange={handleChange}
                error={errors.reminderDate}
                InputLabelProps={{ shrink: true }}
                required
              />
            )}

            <CustomInput
              label="Comments"
              name="comments"
              value={formData.comments}
              onChange={handleChange}
              multiline
              required
            />

            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                gap: 2,
              }}
            >
              <CustomButton
                label="Cancel"
                color="error"
                variant="outlined"
                onClick={() => navigate("/leads/list")}
              />
              <CustomButton type="submit" label="Submit" />
            </Box>
          </FormContainer>
        </form>
      </Card>
    </Box>
  );
};

export default AddLead;
