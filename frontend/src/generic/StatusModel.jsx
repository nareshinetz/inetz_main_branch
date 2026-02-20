import {
  Dialog,
  DialogContent,
  Typography,
  Button,
  Stack,
  Box,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";

const statusMap = {
  success: {
    icon: <CheckCircleOutlineIcon sx={{ fontSize: 70, color: "success.main" }} />,
    titleColor: "success.main",
  },
  error: {
    icon: <ErrorOutlineIcon sx={{ fontSize: 70, color: "error.main" }} />,
    titleColor: "error.main",
  },
  warning: {
    icon: (
      <WarningAmberOutlinedIcon
        sx={{ fontSize: 70, color: "warning.main" }}
      />
    ),
    titleColor: "warning.main",
  },
};

const StatusModal = ({
  open,
  onClose,
  type = "success", // success | error | warning
  title = "Congratulations!",
  message = "Operation completed successfully",
  buttonText = "OK",
}) => {
  const { icon, titleColor } = statusMap[type];

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogContent>
        <Stack spacing={2.5} alignItems="center" sx={{ py: 3 }}>
          {/* Status Icon */}
          <Box>{icon}</Box>

          {/* Title */}
          <Typography
            variant="h5"
            fontWeight={700}
            color={titleColor}
          >
            {title}
          </Typography>

          {/* Message */}
          <Typography
            variant="body2"
            color="text.secondary"
            align="center"
          >
            {message}
          </Typography>

          {/* Action */}
          <Button
            variant="contained"
            onClick={onClose}
            sx={{ mt: 1, minWidth: 120 }}
          >
            {buttonText}
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default StatusModal;
