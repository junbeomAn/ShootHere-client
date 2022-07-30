import styled from '@emotion/styled';
import color from 'commonStyles/color';

const DateBox = styled.div<{
  isActiveDate: boolean;
}>`
  width: 90px;
  vertical-align: top;
  padding: 5px;
  cursor: pointer;
  border-radius: 5px;
  &:hover {
    background: rgba(161, 178, 255, 0.2);
  }
  ${({ isActiveDate }) =>
    isActiveDate ? 'background: rgba(161, 178, 255, 0.2)' : ''};
`;

const DateInner = styled.div`
  min-height: 90px;
`;

const Date = styled.div<{
  isHoliday: boolean;
}>`
  ${({ isHoliday }) => (isHoliday ? `color: ${color.holidayRed}` : '')};
`;

export default {
  DateBox,
  DateInner,
  Date,
};
