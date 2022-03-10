/** @jsx jsx */
/** @jsxFrag */
import { jsx } from '@emotion/react';
import * as React from 'react';

import PlaceItem from '../PlaceItem/PlaceItem.container';
import Modal from '../Modal/Modal.container';
import Carousel from '../Carousel/Carousel.container';

import { IPlaceListPresenter } from './PlaceList.entity';
import { emptyResultStyles, PlaceListStyle } from './PlaceList.styles';
import Spinner from '../Spinner/Spinner.presenter';
import { css } from '@emotion/react';

const PlaceListPresenter = ({
  data,
  images,
  placeName,
  handlePlaceClick,
  isLoading,
}: IPlaceListPresenter) => {
  const createPlaceList = () =>
    data.map((item) => {
      return (
        <PlaceItem
          key={item._id}
          item={item}
          handlePlaceClick={handlePlaceClick}
        />
      );
    });
  return (
    <>
      <div css={PlaceListStyle}>
        {/* {isLoading && <Spinner message='loading...' />} */}
        {!isLoading && data.length === 0 && (
          <span css={emptyResultStyles}>
            해당 조건에 맞는 풋살장이 없습니다.
          </span>
        )}
        {createPlaceList()}
      </div>
      <Modal>
        <Carousel placeName={placeName} images={images} />
      </Modal>
    </>
  );
};

export default PlaceListPresenter;
