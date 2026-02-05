import { Box, Alert, Button, Stack, Typography } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const StatusResult = ({
  type = "success", // "success" | "error"
  title,
  message,
  redirectTo,
  buttonText = "Go Back",
  autoRedirect = false,
  delay = 1500,
}) => {
  const navigate = useNavigate();
  const isSuccess = type === "success";

  useEffect(() => {
    if (autoRedirect && redirectTo) {
      const timer = setTimeout(() => navigate(redirectTo), delay);
      return () => clearTimeout(timer);
    }
  }, [autoRedirect, redirectTo, delay, navigate]);

  return (
    <Box
      minHeight="300px"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Alert
        severity={isSuccess ? "success" : "error"}
        icon={isSuccess ? <CheckCircleOutlineIcon /> : <ErrorOutlineIcon />}
        sx={{ maxWidth: 500, width: "100%", p: 3 }}
      >
        <Stack spacing={2} alignItems="center">
          <Typography variant="h6" fontWeight={700}>
            {title}
          </Typography>

          <Typography variant="body2" color="text.secondary" align="center">
            {message}
          </Typography>

          {redirectTo && !autoRedirect && (
            <Button
              variant={isSuccess ? "contained" : "outlined"}
              onClick={() => navigate(redirectTo)}
            >
              {buttonText}
            </Button>
          )}
        </Stack>
      </Alert>
    </Box>
  );
};

export default StatusResult;
