import React from 'react';
import './BlobButtonStyle.css';
import { Stack } from '@mui/material';

const BlobButton = ({ name, type, onClick }) => {
  return (
    <Stack width={'100%'} alignItems={'center'} onClick={onClick}>
      <button type={type} className={'blob-btn'}>
        {name}
        <span className={'blob-btn__inner'}>
          <span className={'blob-btn__blobs'}>
            <span className={'blob-btn__blob'}></span>
            <span className={'blob-btn__blob'}></span>
            <span className={'blob-btn__blob'}></span>
            <span className={'blob-btn__blob'}></span>
          </span>
        </span>
      </button>
      <br className={'br'} />
      <svg className={'svg'} xmlns={'http://www.w3.org/2000/svg'} version={'1.1'}>
        <defs>
          <filter id={'splash'}>
            <feGaussianBlur
              in={'SourceGraphic'}
              result={'blur'}
              stdDeviation={'10'}
            ></feGaussianBlur>
            <feColorMatrix
              in={'blur'}
              mode={'matrix'}
              values={'1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 21 -7'}
              result={'splash'}
            ></feColorMatrix>
            <feBlend in2={'splash'} in={'SourceGraphic'} result={'mix'}></feBlend>
          </filter>
        </defs>
      </svg>
    </Stack>
  );
};

export default BlobButton;
