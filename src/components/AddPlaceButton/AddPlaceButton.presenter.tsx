/**@jsx jsx */

import { jsx } from '@emotion/react';
import React from 'react';
import { Link } from 'react-router-dom';
import { css } from '@emotion/react';

import { NavStyle } from './AddPlaceButton.styles';
import CustomButton from 'components/CustomButton/CustomButton.presenter';

const AddPlaceButtonPresenter = () => {
  return (
    <nav css={NavStyle}>
      <Link to='/addPlace'>
        <CustomButton
          css={css`
            font-size: 25px;
          `}
          size='medium'
          theme='primary'
        >
          +
        </CustomButton>
      </Link>
    </nav>
  );
};

export default AddPlaceButtonPresenter;
