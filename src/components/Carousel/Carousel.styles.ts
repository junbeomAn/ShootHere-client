import { css } from '@emotion/react';
import styled from '@emotion/styled';

import color from 'commonStyles/color';

export const carouselStyles = css({
  width: '100%',
  height: '100%',
  position: 'relative',
  overflow: 'hidden',
});

export const carouselTitleStyles = css({
  margin: 0,
  span: {
    color: 'transparent',
  },
});

export const ImageContainer = styled.div(
  ({ currentIndex }: { currentIndex: number }) => ({
    height: '80%',
    transform: `translateX(-${currentIndex * 100}%)`,
    transition: `transform 0.4s`,
    whiteSpace: 'nowrap',
    display: 'relative',
  })
);

export const messageStyles = css({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
});

export const carouselItemStyles = css({
  width: '100%',
  height: '100%',
  display: 'inline-flex',
  justifyContent: 'center',
  alignItems: 'center',
  img: {
    width: '400px',
    height: '300px',
    objectFit: 'contain',
  },
});

export const indicatorStyles = css({
  position: 'absolute',
  top: '40%',
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
  button: {
    border: 'none',
    width: '30px',
    height: '30px',
    cursor: 'pointer',
    borderRadius: '50%',
    backgroundColor: color.staleWhite,
    ':hover': {
      backgroundColor: color.textWhite,
    },
  },
});

export const labelStyles = css({
  display: 'flex',
  border: `1px solid ${color.softGrey}`,
  alignItems: 'center',
  marginTop: '10px',
  height: '45px',
  backgroundColor: '#b0b0b038',
});

export const CarouselLabelBtn = styled.button(
  ({ isActive }: { isActive: boolean }) => ({
    opacity: isActive ? '1' : '0.5',
    border: `3px solid ${isActive ? color.deepBlue : 'transparent'}`,
    display: 'flex',
    alignItems: 'center',
    ':hover': {
      opacity: '1',
    },
    backgroundColor: 'transparent',
    padding: 0,
    img: {
      width: '60px',
      height: '45px',
      objectFit: 'contain',
    },
  })
);
