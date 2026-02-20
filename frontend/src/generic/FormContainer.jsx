import { Box } from "@mui/material";

const FormContainer = (props) => {
  return (
    <Box
      sx={{
        display: "grid",
        gap: 3,
        gridTemplateColumns: {
          xs: "1fr",
          sm: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
        },
        alignItems: "start",
        ...props.sx,
      }}
    >
      {props.children}
    </Box>
  );
};

export default FormContainer;
