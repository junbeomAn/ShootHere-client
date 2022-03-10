import { css } from '@emotion/react';
import color from '../commonStyles/color';

export const loginBtnStyles = css({
  width: '200px',
  padding: '15px 20px',
  backgroundColor: color.staleWhite,
  color: color.textGrey,
  borderRadius: '5px',
  border: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-around',
  fontSize: '15px',
  cursor: 'pointer',
  ':hover': {
    backgroundColor: color.hoverGrey,
    color: color.textWhite,
    boxShadow: `0px 2.1px 4.5px -2.1px ${color.hoverGrey}`,
  },
});

export const loginModalTitleStyles = css({
  color: color.textGrey,
});
