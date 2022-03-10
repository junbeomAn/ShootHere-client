import { css } from '@emotion/react';
import styled from '@emotion/styled';

import color from '../commonStyles/color';
import { ISpinnerPresenter } from './Spinner.entity';

export const SpinnerContainer = styled.div<ISpinnerPresenter>`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${color.blurGrey};
  ${({ absolute }) =>
    absolute
      ? `
  position: absolute;
  top: 0;
  `
      : ''}
`;

export const SpinnerMessageStyle = css`
  font-size: 15px;
  color: ${color.hardBlue}
  margin: 2px;
`;
