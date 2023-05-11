import React from 'react';
import { Link } from 'react-router-dom';

const Navigate = ({ to, width, ...children }) => {
  return (
    <Link
      {...children}
      to={to}
      style={{
        textDecoration: 'none',
        width: width ? width : '100%'
      }}
    />
  );
};

export default Navigate;
