import React from 'react';
import { Grid } from '@mui/material';

const CustomGrid = ({ children, container = false, item = false, spacing, xs, md, sx = {}, ...rest }) => {
  return (
    <Grid
      container={container}
      item={item}
      spacing={spacing}
      xs={xs}
      md={md}
      sx={sx}
      {...rest}
    >
      {children}
    </Grid>
  );
};

export default CustomGrid;
