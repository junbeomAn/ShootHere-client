/** @jsx jsx */

import { jsx, css } from '@emotion/react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

import { getSaveButtonStyles } from '../PlaceItem/PlaceItem.styles';
import { stopPropagation } from 'utils';
import { ISaveButtonPresenter } from './SaveButton.entity';

const SaveButtonPresenter = ({
  setMouseOut,
  isSaved,
  mouseOver,
  handleSaveClick,
  placeId,
}: ISaveButtonPresenter) => {
  const SaveStarBtn = isSaved || mouseOver ? AiFillStar : AiOutlineStar;
  return (
    <div
      onMouseOver={() => setMouseOut(true)}
      onMouseLeave={() => setMouseOut(false)}
    >
      <SaveStarBtn
        css={getSaveButtonStyles(isSaved || mouseOver)}
        onClick={stopPropagation(() => {
          handleSaveClick(placeId);
        })}
      />
    </div>
  );
};

export default SaveButtonPresenter;
