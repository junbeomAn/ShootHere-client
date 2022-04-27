/** @jsx jsx */
import * as React from 'react';
import { css, jsx } from '@emotion/react';
import { Link } from 'react-router-dom';

const notFoundStyles = css`
  width: 100%;
  height: 100;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const NotFound = () => {
  return (
    <div css={notFoundStyles}>
      <h1>Page not found in Futsal. Visit other pages</h1>
      <Link to='/'>Go Home</Link>
    </div>
  );
};

export default NotFound;
