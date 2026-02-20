import React from 'react';
import { Card } from '@mui/material';

const CustomCard = ({ children, sx = {}, ...rest }) => {
  return (
    <Card sx={sx} {...rest}>
      {children}
    </Card>
  );
};

export default CustomCard;
