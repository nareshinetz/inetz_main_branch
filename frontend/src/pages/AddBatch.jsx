import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  MenuItem,
  Button,
  Alert,
} from "@mui/material";

const AddBatch = () => {
  const [success, setSuccess] = useState(false);

  const [form, setForm] = useState({
    trainer: "",
    course: "",
    room: "",
    date: "",
    startTime: "",
    duration: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log("Dummy Batch Data:", form);
    setSuccess(true);
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Allocate Batch
        </Typography>

        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            Batch Allocated (Dummy Data)
          </Alert>
        )}

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              select
              fullWidth
              label="Trainer"
              name="trainer"
              value={form.trainer}
              onChange={handleChange}
            >
              <MenuItem value="MERN Trainer">MERN Trainer</MenuItem>
              <MenuItem value="Java Trainer">Java Trainer</MenuItem>
              <MenuItem value="Python Trainer">Python Trainer</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              select
              fullWidth
              label="Course"
              name="course"
              value={form.course}
              onChange={handleChange}
            >
              <MenuItem value="MERN">MERN</MenuItem>
              <MenuItem value="Java Full Stack">Java Full Stack</MenuItem>
              <MenuItem value="Python Full Stack">
                Python Full Stack
              </MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              select
              fullWidth
              label="Room"
              name="room"
              value={form.room}
              onChange={handleChange}
            >
              <MenuItem value="Room 1">Room 1</MenuItem>
              <MenuItem value="Room 2">Room 2</MenuItem>
              <MenuItem value="Room 3">Room 3</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              type="date"
              fullWidth
              name="date"
              value={form.date}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              type="time"
              fullWidth
              label="Start Time"
              name="startTime"
              value={form.startTime}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              select
              fullWidth
              label="Duration"
              name="duration"
              value={form.duration}
              onChange={handleChange}
            >
              <MenuItem value="1">1 Hour</MenuItem>
              <MenuItem value="2">2 Hours</MenuItem>
              <MenuItem value="3">3 Hours</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={12}>
            <Button variant="contained" onClick={handleSubmit}>
              Allocate Batch
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default AddBatch;
