import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
} from "@mui/material";

const dummyBatches = [
  {
    id: 1,
    date: "2026-02-20",
    startTime: "10:00",
    duration: 2,
    trainer: "MERN Trainer",
    course: "MERN",
    room: "Room 1",
  },
  {
    id: 2,
    date: "2026-02-20",
    startTime: "12:00",
    duration: 1,
    trainer: "Java Trainer",
    course: "Java Full Stack",
    room: "Room 2",
  },
  {
    id: 3,
    date: "2026-02-21",
    startTime: "09:00",
    duration: 3,
    trainer: "Python Trainer",
    course: "Python Full Stack",
    room: "Room 3",
  },
];

const BatchList = () => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Batch Allocation List
        </Typography>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>Duration</TableCell>
              <TableCell>Trainer</TableCell>
              <TableCell>Course</TableCell>
              <TableCell>Room</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {dummyBatches.map((batch) => (
              <TableRow key={batch.id}>
                <TableCell>{batch.date}</TableCell>
                <TableCell>{batch.startTime}</TableCell>
                <TableCell>
                  <Chip label={`${batch.duration} hrs`} />
                </TableCell>
                <TableCell>{batch.trainer}</TableCell>
                <TableCell>{batch.course}</TableCell>
                <TableCell>{batch.room}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default BatchList;
