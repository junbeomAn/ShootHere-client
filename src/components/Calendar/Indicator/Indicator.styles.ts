import styled from '@emotion/styled';
import SCalendar from '../Calendar.styles';
import SComponent from 'commonStyles/Component';

const Indicator = styled.div`
  display: flex;
  width: 100px;
  justify-content: space-between;
  align-items: center;
  margin: 30px 0;
`;

const IndicatorButton = styled.button<{
  left?: boolean;
  right?: boolean;
}>`
  width: 20px;
  height: 20px;
  background: transparent;
  font-size: 1.6rem;
  border: 2px solid black;
  cursor: pointer;
  transform: rotate(45deg);

  ${({ left }) =>
    left
      ? `
    border-top: none;
    border-right: none;
  `
      : ''}
  ${({ right }) =>
    right
      ? `
    border-left: none;
    border-bottom: none;
  `
      : ''}
`;

const Month = styled.h1`
  display: flex;
  width: 30px;
  justify-content: center;
  align-items: center;
  margin: 0;
`;

const Year = styled.h3`
  text-align: center;
  width: 60px;
`;

export default {
  Indicator,
  IndicatorButton,
  Month,
  Year,
  SliderBox: SCalendar.SliderBox,
  Container: SComponent.Container,
};
