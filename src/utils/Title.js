import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@mui/material';

function Title({ children }) {
  return (
    <Typography component="h2" variant="h6" color="primary" sx={{margin: 2}} gutterBottom>
      {children}
    </Typography>
  );
}

Title.propTypes = {
  children: PropTypes.node.isRequired,
};

Title.defaultProps = {
  children: 'Default Title'
};

export default Title;
