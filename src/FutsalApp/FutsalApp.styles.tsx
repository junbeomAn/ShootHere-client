import { css } from '@emotion/react';
import color from '../commonStyles/color';
import mq from '../commonStyles/mediaQuery';

export const FutsalAppStyle = css`
  width: 90%;
  height: 70vh;
  display: flex;
  box-shadow: 0px 0.2px 9px 0.2px #afaeae4f;
  position: relative;
  ${mq.tablet} {
    height: 50vh;
  }
  ${mq.mobile} {
    width: 100%;
    height: 75vh;
  }
`;

export const AppLeftBoxStyle = css({
  display: 'flex',
  flexDirection: 'column',
  width: '34%',
  maxWidth: '450px',
  [mq.large]: {
    textOverflow: 'ellipsis',
    maxWidth: '260px',
  },
  [mq.small]: {
    minWidth: '240px',
  },
  [mq.mobile]: {
    width: '100%',
    maxWidth: '100%',
  },
});
