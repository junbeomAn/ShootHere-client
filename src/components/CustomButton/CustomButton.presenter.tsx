/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import * as React from 'react';

import { ICustomButton } from './CustomButton.entity';
import { getCustomButtonStyle } from './CustomButton.styles';

const CustomButton = ({
  size,
  theme,
  children,
  ...otherProps
}: ICustomButton) => {
  return (
    <button css={getCustomButtonStyle({ size, theme })} {...otherProps}>
      {children}
    </button>
  );
};

export default React.memo(CustomButton);
