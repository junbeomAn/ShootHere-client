import { css } from '@emotion/react';
import mq from '../commonStyles/mediaQuery';

export const mapStyles = css`
  width: 66%;
  min-width: calc(100% - 450px);
  height: 100%;
  position: relative;

  ${mq.large} {
    width: calc(100% - 260px);
  }
  ${mq.small} {
    min-width: calc(100% - 240px);
  }
  ${mq.mobile} {
    display: none;
  }
`;
