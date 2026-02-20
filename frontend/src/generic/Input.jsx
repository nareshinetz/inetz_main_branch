// import React from "react";
// import { TextField } from "@mui/material";

// const CustomInput = ({
//   label,
//   name,
//   type = "text",
//   placeholder = "",
//   value,
//   onChange,
//   error = false,
//   sx = {},
//   fullWidth = true,
//   InputLabelProps,
//   ...rest
// }) => {
//   return (
//     <TextField
//       label={label}
//       name={name}
//       type={type}
//       placeholder={placeholder}
//       value={value}
//       onChange={onChange}
//       error={error}
//       fullWidth={fullWidth}
//       InputLabelProps={InputLabelProps}
//       sx={{
//         flex: "1 1 48%",
//         ...sx,
//       }}
//       {...rest}
//     />
//   );
// };

// export default CustomInput;
import React from "react";
import { TextField } from "@mui/material";

const CustomInput = ({
  label,
  name,
  type = "text",
  placeholder = "",
  value,
  onChange,
  error = false,
  helperText = "",
  select = false,
  required = false,
  children,
  fullWidth = true,
  sx = {},
  InputLabelProps,
  ...rest
}) => {
  return (
    <TextField
      label={label}
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      error={!!error}
      helperText={
        helperText || (error && typeof error === "string" ? error : "")
      }
      select={select}
      variant="filled"
      fullWidth={fullWidth}
      InputLabelProps={InputLabelProps}
      sx={{
        width: "100%",
        mb: 2,
        "& .MuiFilledInput-root": {
          borderRadius: "8px",
          backgroundColor: "#f9f9f9",
        },
        ...sx,
      }}
      {...rest}
    >
      {select && children}
    </TextField>
  );
};

export default CustomInput;
