import { TAlignDirection } from 'commonEntity';
import styled from 'styled-components';

const Container = styled.div<{ width?: number; dir?: TAlignDirection }>`
  width: ${({ width }) => `${width}px`};
  overflow: hidden;
  display: flex;
  align-items: center;
  flex-direction: ${({ dir }) => (dir === 'row' ? 'row' : 'column')};
`;

export default {
  Container,
};
