import styled from '@emotion/styled';
import { TDirection } from './Calendar.entity';

export const getTranslateStyle = (dir: TDirection, width: number) => {
  if (dir === 'right') {
    return `
    transform: translateX(-${width * 2}px);
    transition: all 0.3s ease-in-out;
    `;
  } else if (dir === 'left') {
    return `
    transform: translateX(0px);
    transition: all 0.3s ease-in-out;
    `;
  }
  return '';
};

const SliderBox = styled.div<{
  width?: number;
  translateDirection?: TDirection;
}>`
  display: flex;
  transform: ${({ width }) => `translateX(-${width}px)`};
  ${({ translateDirection, width }) =>
    getTranslateStyle(translateDirection, width)}
`;

const Calendar = styled.section`
  width: 630px;
  min-height: 450px;
  display: flex;
  flex-direction: column;
  border-spacing: 0;
  border-collapse: collapse;
  overflow: hidden;
`;

const CalendarWrapper = styled.div``;

export default {
  SliderBox,
  Calendar,
  CalendarWrapper,
};
