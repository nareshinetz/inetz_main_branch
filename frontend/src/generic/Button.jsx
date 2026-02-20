import React from 'react';
import { Button } from '@mui/material';

const CustomButton = ({
  label,
  onClick,
  type = 'button',
  color = 'primary',
  variant = 'contained',
  size = 'large',
  sx = {},
  ...rest
}) => {
  return (
    <Button
      type={type}
      onClick={onClick}
      color={color}
      variant={variant}
      size={size}
      sx={{
        px: 5,
        py: 1.5,
        borderRadius: '8px',
        fontWeight: 'bold',
        ...sx,
      }}
      {...rest}
    >
      {label}
    </Button>
  );
};

export default CustomButton;
