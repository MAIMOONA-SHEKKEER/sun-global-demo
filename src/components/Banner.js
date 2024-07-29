import React from 'react';
import { Grid } from '@mui/material';

const Banner=() =>{
  return (
    <Grid 
    item 
    xs={12} 
    md={5} 
    sx={{
      backgroundImage: `url(https://picsum.photos/id/16/400/300)`,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      borderRadius: 2,
      margin: 5
    }} 
  />
  )
}

export default Banner