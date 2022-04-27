/** @jsx jsx */
import { jsx } from '@emotion/react';
import * as React from 'react';
import {
  MdOutlineArrowBackIos,
  MdOutlineArrowForwardIos,
} from 'react-icons/md';

import Spinner from 'components/Spinner/Spinner.presenter';

import { urlFor } from 'api/client';

import {
  carouselStyles,
  ImageContainer,
  indicatorStyles,
  labelStyles,
  carouselItemStyles,
  carouselTitleStyles,
  messageStyles,
  CarouselLabelBtn,
} from './Carousel.styles';
import { ICarouselItem, ICarouselPresenter } from './Carousel.entity';
import { IPlaceImage } from 'components/PlaceList/PlaceList.entity';

const CarouselItem = ({ children }: ICarouselItem) => {
  return <div css={carouselItemStyles}>{children}</div>;
};

const CarouselPresenter = ({
  images,
  placeName,
  currentIndex,
  updateIndex,
}: ICarouselPresenter) => {
  const onImageIndicatorClick = (e: React.MouseEvent) => {
    const { id } = e.currentTarget;
    updateIndex(Number(id));
  };
  const createCarouselItemCb = (item: IPlaceImage, i: number) => (
    <CarouselItem key={i}>
      <img src={urlFor(item).url()} alt='place-photo' />
    </CarouselItem>
  );
  const createCarouselLabelBtnCb = (item: IPlaceImage, i: number) => (
    <CarouselLabelBtn
      isActive={currentIndex === i}
      key={`${i}`}
      id={`${i}`}
      onClick={onImageIndicatorClick}
    >
      <img src={urlFor(item).url()} alt='place-photo' />
    </CarouselLabelBtn>
  );
  const getItems = <T,>(
    data: T[],
    cb: (item: T, i: number) => jsx.JSX.Element
  ) => data.map(cb);

  return (
    <div css={carouselStyles}>
      <h2 css={carouselTitleStyles}>
        {!placeName && <span>구장 이름</span>}
        {placeName}
      </h2>
      <ImageContainer currentIndex={currentIndex}>
        {images.length === 0 && (
          <span css={messageStyles}>
            {placeName ? '현재 등록된 구장 이미지가 없습니다.' : <Spinner />}
          </span>
        )}
        {getItems(images, createCarouselItemCb)}
      </ImageContainer>
      <div css={indicatorStyles}>
        <button onClick={() => updateIndex(currentIndex - 1)}>
          <MdOutlineArrowBackIos />
        </button>
        <button onClick={() => updateIndex(currentIndex + 1)}>
          <MdOutlineArrowForwardIos />
        </button>
      </div>
      <div css={labelStyles}>{getItems(images, createCarouselLabelBtnCb)}</div>
    </div>
  );
};

export default CarouselPresenter;
