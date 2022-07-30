import { css } from '@emotion/react';
import styled from '@emotion/styled';
import color from 'commonStyles/color';

const TimePicker = styled.div<{
  isActiveDate: boolean;
  sameActiveWeek: boolean;
}>`
  transition: ${({ sameActiveWeek }) =>
    sameActiveWeek ? 'none' : `all 0.15s ease-in-out`};
  max-height: ${({ isActiveDate }) => (isActiveDate ? '320px' : '0')};
  overflow: hidden;
`;

const SlotSelectedStyles = css`
  border: 1px solid ${color.selectBorder};
  border-top: 1px solid transparent;
  border-bottom: 1px solid transparent;
  background: ${color.selectBg};
`;

const getSelectedEdgeStyles = ({
  isSelected,
  isStart,
  isEnd,
}: {
  isSelected: boolean;
  isStart: boolean;
  isEnd: boolean;
}) => {
  if (!isSelected) return css``;
  if (isStart) {
    return css`
      border-radius: 5px 5px 0 0;
      border-top: 1px solid ${color.selectBorder};
    `;
  }
  if (isEnd) {
    return css`
      border-radius: 0 0 5px 5px;
      border-bottom: 1px solid ${color.selectBorder};
    `;
  }
};

const Slot = styled.div<{
  isSelected: boolean;
  isStart: boolean;
  isEnd: boolean;
}>`
  width: 100%;
  font-size: 0.7rem;
  display: flex;
  justify-content: center;
  border: 1px solid transparent;
  &:hover {
    background: ${color.selectBg};
  }
  ${({ isSelected }) => (isSelected ? SlotSelectedStyles : '')}
  ${getSelectedEdgeStyles}
`;

export default {
  TimePicker,
  Slot,
};
