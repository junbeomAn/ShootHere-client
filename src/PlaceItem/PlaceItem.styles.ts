import { css } from '@emotion/react';
import styled from '@emotion/styled';

import color from '../commonStyles/color';
import mq from '../commonStyles/mediaQuery';
import { IPlaceItemProps } from './PlaceItem.entity';

export const PlaceItem = styled.div<IPlaceItemProps>`
  display: flex;
  justify-content: space-between;
  border-top: 1px solid transparent;
  border-bottom: 1px solid #eaeaea;
  background-color: ${({ selected }) =>
    selected ? color.softBlue : color.textWhite};
  color: #5a5a5a;
  width: 100%;
  height: 120px;
  padding: 15px;
  font-size: 0.8rem;
  box-sizing: border-box;
  cursor: pointer;
  &:hover {
    background-color: #e7f9ff7d;
    border-top: 1px solid ${color.softBlue};
    border-bottom: 1px solid ${color.softBlue};
  }
  ${mq.large} {
    flex-direction: column;
    height: 240px;
  }
  ${mq.mobile} {
    flex-direction: row;
    height: 120px;
    font-size: 0.7rem;
  }
`;

////#f6f7f7
// box-shadow: 0px 1px 2px 1px #ABABAB;

export const leftBoxStyle = css`
  width: 60%;
  height: 100%;
  .left-box-item {
    margin-bottom: 10px;
  }
  .name {
    font-size: 1rem;
    font-weight: 700;
    display: flex;
    align-items: center;
  }
  .address {
    height: 60px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }

  ${mq.large} {
    width: 100%;
    height: 50%;
    margin-bottom: 10px;
  }
  ${mq.mobile} {
    height: 100%;
    .name {
      font-size: 0.8rem;
    }
    .address {
      font-size: 0.7rem;
    }
  }
`;

export const getSaveButtonStyles = (isFilled: boolean) => css`
  color: ${color[isFilled ? 'starYellow' : 'textGrey']};
  font-size: 20px;
  margin-left: 10px;
`;

export const rightBoxStyle = css`
  width: 40%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  .right-box-item {
    margin-bottom: 10px;
  }
  & > div i {
    margin-right: 10px;
  }
  .reservationPage {
    a {
      font-weight: 700;
      &:hover {
        color: ${color.deepBlue};
      }
    }
  }

  ${mq.large} {
    width: 100%;
    height: 50%;
  }
  ${mq.mobile} {
    height: 100%;
    .right-box-item {
      padding-left: 10px;
    }
  }
`;
