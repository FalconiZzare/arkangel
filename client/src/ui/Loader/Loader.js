import React from 'react';
import './LoaderStyle.css';

const Loader = ({ color }) => {
  return (
    <div className={'wave'}>
      <div className={`rect ${color}-1`}></div>
      <div className={`rect ${color}-2`}></div>
      <div className={`rect ${color}-3`}></div>
      <div className={`rect ${color}-4`}></div>
      <div className={`rect ${color}-5`}></div>
    </div>
  );
};

export default Loader;
