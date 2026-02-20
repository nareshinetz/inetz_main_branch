import React from "react";
import { Typography } from "@mui/material";


const CustomTypography = (
    {    
        variant = 'h4',
        color="black",
         gutterBottom,
         component="h1",
  sx = {},
  
  ...rest
    }
) => {
    return(
        <Typography
        variant={variant}
        color={color}
        component={component}
         sx={{ mb: 4, fontWeight: 600,...sx }}
         {...rest}
         >

         </Typography>
    );
};

export default CustomTypography;