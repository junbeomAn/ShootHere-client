/** @jsx jsx */
import { jsx } from '@emotion/react';
import * as React from 'react';
import { BeatLoader } from 'react-spinners';

import { ISpinnerPresenter } from './Spinner.entity';
import { SpinnerContainer, SpinnerMessageStyle } from './Spinner.styles';

const Spinner = ({ message = '', absolute }: ISpinnerPresenter) => {
  return (
    <SpinnerContainer absolute={absolute}>
      <BeatLoader />
      <p css={SpinnerMessageStyle}>{message}</p>
    </SpinnerContainer>
  );
};

export default Spinner;
