import { css } from '@emotion/react';
import color from 'commonStyles/color';

export const FilterPresenterStyles = css({
  display: 'flex',
  flexDirection: 'column',
  zIndex: 10,
  // borderBottom: `1px solid ${color.softGrey}`,
});

export const filterBtnContainerStyles = css({
  display: 'flex',
  scrollBehavior: 'unset',
  paddingLeft: '15px',
  marginBottom: '10px',
  height: '45px',
  padding: '10px 0 10px 15px',
  backgroundColor: `${color.whiteGrey}`,
});

const baseFilterStyle = {
  listStyle: 'none',
  display: 'flex',
  width: '70px',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '11px 5px',
  borderRadius: '5px',
  border: `1px solid ${color.softGrey}`,
  fontSize: '12px',
  cursor: 'pointer',
};

export const savedFilterActiveStyle = css({
  backgroundColor: color.starYellow,
  color: color.deepBlue,
  ...baseFilterStyle,
});

export const savedFilterInActiveStyle = css({
  backgroundColor: color.textWhite,
  color: color.textGrey,
  ...baseFilterStyle,
});
