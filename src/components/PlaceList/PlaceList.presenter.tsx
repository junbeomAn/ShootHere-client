/** @jsx jsx */
/** @jsxFrag */
import { jsx } from '@emotion/react';
import * as React from 'react';
import { css } from '@emotion/react';

import PlaceItem from 'components/PlaceItem/PlaceItem.container';
import Modal from 'components/Modal/Modal.container';
import Carousel from 'components/Carousel/Carousel.container';
import Spinner from 'components/Spinner/Spinner.presenter';

import { IPlaceListPresenter } from './PlaceList.entity';
import {
  emptyResultStyles,
  noMorePageMsgStyles,
  placeListStyle,
} from './PlaceList.styles';
import { spinnerCustomContainerStyles } from './PlaceList.styles';

const NO_RESULT_MSG = '해당 조건에 맞는 풋살장이 없습니다.';
const NO_MORE_RESULTS = '더이상 불러올 풋살장이 없습니다.';

const PlaceListPresenter = ({
  data,
  handlePlaceClick,
  isLoading,
  loadingRef,
  isLastPage,
}: IPlaceListPresenter) => {
  const getPlaceList = () =>
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
      <div css={placeListStyle}>
        {!isLoading && data.length === 0 && (
          <span css={emptyResultStyles}>{NO_RESULT_MSG}</span>
        )}
        {getPlaceList()}
        {/* {isLastPage && !isLoading && <NoMorePageMessage />} */}
        {
          <div ref={loadingRef} css={spinnerCustomContainerStyles}>
            {(!isLastPage || isLoading) && (
              <Spinner
                style={{
                  width: '20px',
                  height: '20px',
                  borderWidth: '3px',
                  margin: '15px 0 15px',
                }}
              />
            )}
          </div>
        }
      </div>
    </>
  );
};

export default PlaceListPresenter;

function NoMorePageMessage() {
  return <div css={noMorePageMsgStyles}>{NO_MORE_RESULTS}</div>;
}
