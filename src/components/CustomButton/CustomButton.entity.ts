import { Interpolation, Theme } from '@emotion/react';

export interface ICustomButton {
  size?: string;
  theme?: string;
  children?: string | React.ReactElement;
  css?: Interpolation<Theme>;
  onClick?: (e: React.MouseEvent) => void;
}
