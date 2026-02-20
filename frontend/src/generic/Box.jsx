import React from 'react';
import { Box } from '@mui/material';

const CustomBox = ({ children, sx = {}, ...rest }) => {
  return (
    <Box sx={sx} {...rest}>
      {children}
    </Box>
  );
};

export default CustomBox;
