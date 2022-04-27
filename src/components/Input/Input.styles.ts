import { css } from '@emotion/react';

import color from 'commonStyles/color';

export const inputPresenterStyles = css`
  position: relative;
  width: 100%;
`;

export const labelStyles = css`
  position: absolute;
  top: -18px;
  left: 0px;
  font-weight: 800;
`;

const inputBaseStyles = `
  width: 100%;
  outline: none;
  padding: 15px 15px;
  font-size: 15px;
  border: none;
  &::placeholder {
    opacity: 0.6;
  }
`;
export const inputStyles = (addStyles: string) => css`
  ${inputBaseStyles}
  ${addStyles}
`;

export const inputErrorStyles = css`
  ${inputBaseStyles}
  border-color: ${color.errorRed};
`;
