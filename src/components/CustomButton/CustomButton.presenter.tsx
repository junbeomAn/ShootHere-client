/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import * as React from 'react';

import { ICustomButton } from './CustomButton.entity';
import { GetCustomButtonStyle } from './CustomButton.styles';

const CustomButton = ({
  size,
  theme,
  children,
  ...otherProps
}: ICustomButton) => {
  return (
    <button css={GetCustomButtonStyle({ size, theme })} {...otherProps}>
      {children}
    </button>
  );
};

export default React.memo(CustomButton);
