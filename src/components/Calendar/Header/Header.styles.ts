import styled from '@emotion/styled';

const Header = styled.header`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 40px;

  border-left: none;
  border-right: none;
`;

const Day = styled.div`
  padding: 5px 0;
  display: flex;
  flex: 1;
  justify-content: center;
  &:last-of-type div {
    border-right: none;
  }
`;

const DayInner = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

export default {
  Header,
  Day,
  DayInner,
};
