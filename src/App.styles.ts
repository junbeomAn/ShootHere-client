/** @jsx jsx */
import { css } from '@emotion/react';

import color from 'commonStyles/color';
import mq from 'commonStyles/mediaQuery';

export const globalStyle = css`
  body {
    font-family: AppleSDGothicNeo, sans-serif;
    font-size: 16px;
    font-weight: normal;
    color: ${color.textGrey};
    h1,
    h2,
    h3,
    h4 {
      margin: 0;
    }
  }
`;

export const appStyle = css`
  display: flex;
  position: relative;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  /* height: 100vh; */
  /* min-height: 700px; */
  min-height: 100vh;
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
