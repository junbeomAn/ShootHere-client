import { css } from '@emotion/react';
import color from '../commonStyles/color';

export const PlaceListStyle = css`
  height: 100%;
  overflow: auto;
  border-right: 1px solid ${color.softGrey};
  display: flex;
  flex-direction: column;

  &::-webkit-scrollbar {
    width: 7px;
  }
  &::-webkit-scrollbar-track {
    background-color: #98e6ff52;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${color.hardBlue};
    border-radius: 5px;
  }
`;

export const emptyResultStyles = css`
  width: 100%;
  text-align: center;
  margin-top: 100px;
`;
