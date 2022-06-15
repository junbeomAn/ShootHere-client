import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled';

import color from 'commonStyles/color';
import mq from 'commonStyles/mediaQuery';

import { IModalContainer } from './Modal.entity';

const fadeIn = keyframes`
  from {
    opacity: 0.7;
  }
  to {
    opacity: 1;
  }
`;

export const modalStyles = css({
  width: '100%',
  height: '100%',
  backgroundColor: color.blurDarkGrey,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  gap: '40px',
  alignItems: 'center',
  position: 'absolute',
  top: 0,
  left: 0,
  animation: `0.3s ${fadeIn} ease-in-out`,
  zIndex: '10',
  '::backdrop': {
    border: 'none',
    backgroundColor: color.blurGrey,
  },
  backdropFilter: 'blur(4px)',
});

export const ModalBox = styled.div<IModalContainer>(({ width, height }) => ({
  backgroundColor: color.textWhite,
  borderRadius: '10px',
  width: width || '80%',
  height: height || '90%',
  maxWidth: '700px',
  maxHeight: '560px',
  padding: '20px',
  display: 'flex',
  position: 'relative',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  [mq.tablet]: {
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
    color: color.textWhite,
  },
}));

export const closeBtnStyles = css({
  position: 'absolute',
  top: '20px',
  right: '20px',
  cursor: 'pointer',
  fontSize: '1.25rem',
  border: 'none',
  zIndex: 10,
  color: color.textGrey,
  [mq.tablet]: {
    fill: color.textWhite,
    fontSize: '1.8rem',
  },
});
