import { css } from '@emotion/react';

import color from 'commonStyles/color';
import { ICustomButton } from './CustomButton.entity';

const getSize = (size: string): string => {
  switch (size) {
    case 'xlarge':
      return `
        width: 80px;
        height: 50px;
        font-size: 16px;
      `;
    case 'large':
      return `
        width: 70px;
        height: 40px;
        font-size: 14px;
      `;
    case 'medium':
      return `
        width: 55px;
        height: 30px;
        font-size: 12px;
      `;
    case 'small':
      return `
        width: 40px;
        height: 25px;
        font-size: 12px;
      `;
    case 'xsmall':
      return `
        width: 30px;
        height: 25px;
        font-size: 10px;
      `;
    default:
      return `
        width: 55px;
        height: 30px;
        font-size: 12px;
      `;
  }
};

const getTheme = (theme: string): string => {
  switch (theme) {
    case 'primary':
      return `
        background-color: ${color.deepBlue};
        color: white;
        &:hover {
          background-color: white;
          color: ${color.deepBlue};
          border: 1px solid ${color.deepBlue};
        }
      `;
    default:
      return `
        background-color: ${color.deepBlue};
        color: white;
        &:hover {
          background-color: white;
          color: ${color.deepBlue};
          border: 1px solid ${color.deepBlue};
        }
      `;
  }
};

export const getCustomButtonStyle = (props: ICustomButton) => css`
  ${getSize(props.size)}
  ${getTheme(props.theme)}
  border-radius: 5px;
  border: none;
  cursor: pointer;
  border: 1px solid transparent;
`;
