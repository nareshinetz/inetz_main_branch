import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  MenuItem,
  Button,
  Stack,
  Divider,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createBatch } from "../redux/slices/batchSlice";
import { fetchStaff } from "../redux/slices/staffSlice";

const AddBatch = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.batches);
  const { staff, loading: staffLoading } = useSelector(
    (state) => state.staff
  );

  const [formData, setFormData] = useState({
    batchName: "",
    roomNumber: "",
    startTime: "",
    endTime: "",
    status: "COMPLETED",
    staffIds: [],
  });

  const [localerror, localsetError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    dispatch(fetchStaff());
    console.log(staff)
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.batchName ||
      !formData.roomNumber ||
      !formData.startTime ||
      !formData.endTime
    ) {
      return;
    }

    const result = await dispatch(createBatch(formData));

    if (createBatch.fulfilled.match(result)) {
      navigate("/batch/list");
    }
  };

  return (
    <Box>
      <Typography variant="h4" fontWeight={600} mb={3}>
        Add New Batch
      </Typography>

      <Card sx={{ borderRadius: 3 }}>
        <CardContent sx={{ p: { xs: 4, sm: 4, md: 5 } }}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>

              {/* Batch Name */}
              <Grid item xs={12} md={4} sx={{ width: '30%' }}>
                <TextField
                  label="Batch ID"
                  name="batchName"
                  fullWidth
                  value={formData.batchName}
                  onChange={handleChange}
                />
              </Grid>

              {/* Room Number */}
              <Grid item xs={12} md={4} sx={{ width: '30%' }}>
                <TextField
                  label="Room Number"
                  name="roomNumber"
                  fullWidth
                  value={formData.roomNumber}
                  onChange={handleChange}
                />
              </Grid>

              {/* Start Time */}
              <Grid item xs={12} md={4} sx={{ width: '30%' }}>
                <TextField
                  type="time"
                  label="Start Time"
                  name="startTime"
                  fullWidth
                  value={formData.startTime}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>

              {/* End Time */}
              <Grid item xs={12} md={4} sx={{ width: '30%' }}>
                <TextField
                  type="time"
                  label="End Time"
                  name="endTime"
                  fullWidth
                  value={formData.endTime}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>

              {/* Status */}
              <Grid item xs={12} md={4} sx={{ width: '30%' }}>
                <TextField
                  select
                  label="Status"
                  name="status"
                  fullWidth
                  value={formData.status}
                  onChange={handleChange}
                >
                  <MenuItem value="COMPLETED">COMPLETED</MenuItem>
                  <MenuItem value="ACTIVE">ACTIVE</MenuItem>
                </TextField>


              </Grid>

              <Grid item xs={12} md={4} sx={{ width: "30%" }}>
                <TextField
                  select
                  label="Assign Staff"
                  name="staffIds"
                  fullWidth
                  value={formData.staffIds}
                  SelectProps={{
                    multiple: true, MenuProps: {
                      PaperProps: {
                        style: {
                          maxHeight: 250,
                        },
                      },
                    },
                    renderValue: (selected) =>
                      staff
                        ?.filter((s) => selected.includes(s.id))
                        .map((s) => s.staffName)
                        .join(", "),
                  }}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      staffIds: e.target.value.map((id) => Number(id)),
                    }))
                  }
                >
                  {staffLoading ? (
                    <MenuItem disabled>Loading...</MenuItem>
                  ) : staff && staff.length > 0 ? (
                    staff.map((s) => (
                      <MenuItem key={s.id} value={s.id}>
                        {s.staffName}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem disabled>No Staff Available</MenuItem>
                  )}
                </TextField>
              </Grid>

              {/* Buttons */}
              <Grid item xs={12} md={4} sx={{ width: '30%' }}>
                <Box
                  sx={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "row-reverse",
                    gap: 2,
                    justifyContent: "center",
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
                    SAVE
                  </Button>

                  <Button
                    variant="outlined"
                    size="large"
                    color="error"
                    fullWidth
                    onClick={() => navigate("/batch/list")}
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

              {/* Alerts */}
              {localerror && (
                <Grid item xs={12}>
                  <Alert severity="error">{localerror}</Alert>
                </Grid>
              )}

              {success && (
                <Grid item xs={12}>
                  <Alert severity="success">
                    Batch Created Successfully
                  </Alert>
                </Grid>
              )}

            </Grid>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AddBatch;