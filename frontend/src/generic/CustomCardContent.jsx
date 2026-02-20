import React from 'react';
import { CardContent } from '@mui/material';

const CustomCardContent = ({ children, sx = {}, ...rest }) => {
  return (
    <CardContent sx={sx} {...rest}>
      {children}
    </CardContent>
  );
};

export default CustomCardContent;
