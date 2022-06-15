/** @jsx jsx */
/**@jsxFrag */

import { jsx, CSSObject, css } from '@emotion/react';
import * as React from 'react';

import { ISpinnerPresenter } from './Spinner.entity';
import {
  LoadingSpinner,
  SpinnerContainer,
  spinnerMessageStyle,
} from './Spinner.styles';

export const SpinnerWithContainer = ({
  message = '',
  absolute,
}: ISpinnerPresenter) => {
  return (
    <SpinnerContainer absolute={absolute}>
      <LoadingSpinner />
      <p css={spinnerMessageStyle}>{message}</p>
    </SpinnerContainer>
  );
};

function Spinner({ style }: { style?: CSSObject }) {
  return <LoadingSpinner css={css(style)} />;
}

export default Spinner;
