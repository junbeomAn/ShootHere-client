/** @jsx jsx */
import { css } from '@emotion/react';
import mq from 'commonStyles/mediaQuery';

export const appStyle = css`
  display: flex;
  position: relative;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
  min-height: 700px;
`;

export const logoBoxStyle = css`
  cursor: pointer;
  display: flex;
  align-items: center;
  margin: 40px 0 0 0;
  ${mq.mobile} {
    top: 0px;
  }
`;

export const logoStyle = css`
  width: 300px;
  ${mq.mobile} {
    width: 200px;
  }
`;
