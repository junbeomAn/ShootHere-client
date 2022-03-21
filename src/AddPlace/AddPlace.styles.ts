import { css, keyframes } from '@emotion/react';

import color from '../commonStyles/color';

export const addPlaceStyles = css`
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  margin-top: 60px;
  h2 {
    margin-bottom: 50px;
  }
`;

export const errorMessageStyles = css`
  color: ${color.errorRed};
  position: absolute;
  top: 60px;
`;

export const uploadContainerStyles = css`
  & > h3 {
    margin-top: 0;
  }
`;

export const uploadImagePreviewStyles = css`
  display: flex;
  align-items: center;
  width: 300px;
  height: 45px;
  border: 1px solid ${color.hoverGrey};
  margin-bottom: 10px;
  border-radius: 5px;
  overflow: auto;
  span {
    font-size: 13px;
    margin-left: 5px;
  }
  img {
    width: 80px;
    height: 100%;
    object-fit: contain;
    margin-right: 5px;
  }
`;

export const uploadAreaStyles = css`
  width: 100%;
  height: 250px;
  backgroundcolor: ${color.softGrey};
  border: 2px solid ${color.hoverGrey};
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  h3 {
    font-size: 16px;
  }
`;

export const uploadInputStyles = css`
  width: 0px;
  height: 0px;
`;

export const inputSubmitStyles = css`
  background-color: ${color.softGrey};
  width: 70px;
  border-radius: 5px;
  border: none;
  padding: 10px 5px;
  color: ${color.textGrey};
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  font-size: 13px;
  text-align: center;
  display: flex;
  justify-content: center;
  &:hover {
    color: ${color.textWhite};
    background-color: ${color.hoverGrey};
  }
`;

const rotateAnimationKeyframe = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const inputSpinnerStyles = css({
  width: '13px',
  height: '13px',
  border: `2px solid ${color.hoverGrey}`,
  borderTopColor: `${color.textGrey}`,
  borderRadius: '50%',
  animation: `0.7s ${rotateAnimationKeyframe} infinite linear`,
});
