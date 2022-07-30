/** @jsx jsx */
import { css } from '@emotion/react';
import styled from '@emotion/styled';

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

const LogoBox = styled.div<{ isHome: boolean }>`
  cursor: pointer;
  display: flex;
  align-items: center;
  margin: 40px 0 0 0;
  ${({ isHome }) => (!isHome ? 'margin-top: 20px' : '')};
  ${mq.mobile} {
    top: 0px;
  }
`;

const Logo = styled.img<{ isHome: boolean }>`
  width: ${({ isHome }) => (isHome ? '300px' : '200px')};
  ${mq.mobile} {
    width: 200px;
  }
`;

export default {
  LogoBox,
  Logo,
};
