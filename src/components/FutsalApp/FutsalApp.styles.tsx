import { css } from '@emotion/react';
import mq from 'commonStyles/mediaQuery';

export const FutsalAppStyle = css`
  width: 90%;
  height: 70vh;
  min-height: 500px;
  display: flex;
  box-shadow: 0px 0.2px 9px 0.2px #afaeae4f;

  ${mq.tablet} {
    height: 50vh;
  }
  ${mq.mobile} {
    width: 100%;
    height: 75vh;
  }
`;

export const NavStyle = css`
  position: absolute;
  top: -60px;
  right: 10px;
  display: flex;
  align-items: center;
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
