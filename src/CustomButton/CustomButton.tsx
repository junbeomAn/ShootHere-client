/** @jsx jsx */
import { css, jsx, Interpolation, Theme } from '@emotion/react';
import * as React from 'react';
import color from '../commonStyles/color';

interface ICustomButton {
  size?: string;
  theme?: string;
  children?: string | React.ReactElement;
  css?: Interpolation<Theme>;
  onClick?: (e: React.MouseEvent) => void;
}

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
      `;
    default:
      return `
        background-color: ${color.deepBlue};
        color: white;
      `;
  }
};

const GetCustomButtonStyle = (props: ICustomButton) => css`
  ${getSize(props.size)}
  ${getTheme(props.theme)}
  border-radius: 5px;
  border: none;
  cursor: pointer;
`;

const CustomButton = ({
  size,
  theme,
  children,
  ...otherProps
}: ICustomButton) => {
  return (
    <button css={GetCustomButtonStyle({ size, theme })} {...otherProps}>
      {children}
    </button>
  );
};

export default React.memo(CustomButton);
