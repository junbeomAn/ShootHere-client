import styled from '@emotion/styled';

const Week = styled.div<{
  isActiveWeek: boolean;
}>`
  display: flex;
  min-height: ${({ isActiveWeek }) => (isActiveWeek ? '320px' : '90px')};
  transition: min-height 0.15s ease-in-out;
  -webkit-transition: min-height 0.15s ease-in-out;
  -moz-transition: min-height 0.15s ease-in-out;
  overflow: hidden;
`;

export default {
  Week,
};
