import { css } from '@emotion/react';
import color from 'commonStyles/color';
import mq from 'commonStyles/mediaQuery';

export const footerStyles = css`
  width: 100%;
  height: 90px;
  background: #fafbfc;
  border-top: 1px solid #e4e8eb;
  padding: 10px 0;
  color: ${color.textGrey};
  display: flex;
  justify-content: center;
  ${mq.mobile} {
    height: 60px;
    font-size: 0.7rem;
  }
`;

export const footerBoxContainerStyles = css`
  width: 90%;
  display: flex;
  justify-content: center;
  a:hover {
    color: ${color.deepBlue};
  }
`;

export const infoStyles = css`
  display: flex;
  margin-bottom: 10px;
  a:first-of-type {
    margin-right: 10px;
  }
`;

export const footerBoxStyles = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
