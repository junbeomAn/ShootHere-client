import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled';

import color from 'commonStyles/color';
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

const rotateAnimationKeyframe = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const LoadingSpinner = styled.div({
  width: '25px',
  height: '25px',
  border: `2px solid ${color.hoverGrey}`,
  borderTopColor: `${color.textGrey}`,
  borderRadius: '50%',
  animation: `0.7s ${rotateAnimationKeyframe} infinite linear`,
});
