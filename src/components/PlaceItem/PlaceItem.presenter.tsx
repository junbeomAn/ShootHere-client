/** @jsx jsx */
import { jsx } from '@emotion/react';

import CustomButton from 'components/CustomButton/CustomButton.presenter';

import { toPrice, stopPropagation, meterToKilometer } from 'utils';

import { IPlaceItemPresenter } from './PlaceItem.entity';
import { rightBoxStyle, leftBoxStyle, PlaceItem } from './PlaceItem.styles';
import SaveButton from 'components/SaveButton/SaveButton.container';

const PlaceItemPresenter = ({
  item,
  handleDirectionsClick,
  handlePlaceClick,
  isSaved,
  isSelected,
  distanceFromCurrentPosition,
}: IPlaceItemPresenter) => {
  const {
    address,
    placeName,
    phoneNumber,
    reservationPage,
    minPrice,
    maxPrice,
    _id,
  } = item;

  return (
    <PlaceItem
      selected={isSelected}
      onClick={() => handlePlaceClick(_id, placeName)}
    >
      <div css={leftBoxStyle}>
        <div className='left-box-item name'>
          {placeName}
          <SaveButton isSaved={isSaved} placeId={_id} />
        </div>
        <div className='left-box-item address'>
          <span>{item.address}</span>
          <div>
            <CustomButton
              size='medium'
              theme='primary'
              onClick={stopPropagation(() => handleDirectionsClick(address))}
            >
              길찾기
            </CustomButton>
            {/* geolib 라이브러리로 현재 좌표에서 해당 좌표까지 직선 거리 구한다. */}
            <span className='distance'>
              {meterToKilometer(distanceFromCurrentPosition)}km
            </span>
          </div>
        </div>
      </div>
      <div css={rightBoxStyle}>
        <div className='right-box-item phoneNumber'>
          <i className='fas fa-phone-volume'></i>({phoneNumber || ' - '})
        </div>
        <div className='right-box-item reservationPage'>
          <i className='fab fa-internet-explorer'></i>(
          {reservationPage ? (
            <a target='_blank' href={reservationPage}>
              예약하기
            </a>
          ) : (
            ' - '
          )}
          )
        </div>
        <div className='right-box-item price'>
          <i className='fas fa-won-sign'></i>
          {minPrice && maxPrice
            ? `${toPrice(minPrice)} ~ ${toPrice(maxPrice)}`
            : '-'}
          {}
        </div>
      </div>
    </PlaceItem>
  );
};

export default PlaceItemPresenter;
