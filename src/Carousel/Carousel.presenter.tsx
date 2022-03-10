/** @jsx jsx */
import { jsx } from '@emotion/react';

import * as React from 'react';
import {
  MdOutlineArrowBackIos,
  MdOutlineArrowForwardIos,
} from 'react-icons/md';

import { urlFor } from '../api/client';
import { ICarouselItem, ICarouselPresenter } from './Carousel.entity';

import {
  carouselStyles,
  ImageContainer,
  indicatorStyles,
  labelStyles,
  carouselItemStyles,
  carouselTitleStyles,
  emptyMessageStyles,
  CarouselLabelBtn,
} from './Carousel.styles';

const CarouselItem: React.FunctionComponent<ICarouselItem> = ({ children }) => {
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

  return (
    <div css={carouselStyles}>
      <h2 css={carouselTitleStyles}>{placeName}</h2>
      <ImageContainer currentIndex={currentIndex}>
        {images.length === 0 && (
          <span css={emptyMessageStyles}>
            현재 등록된 구장 이미지가 없습니다.
          </span>
        )}
        {images.map((item, i) => (
          <CarouselItem key={i}>
            <img src={urlFor(item).url()} alt='place-photo' />
          </CarouselItem>
        ))}
      </ImageContainer>
      <div css={indicatorStyles}>
        <button onClick={() => updateIndex(currentIndex - 1)}>
          <MdOutlineArrowBackIos />
        </button>
        <button onClick={() => updateIndex(currentIndex + 1)}>
          <MdOutlineArrowForwardIos />
        </button>
      </div>
      <div css={labelStyles}>
        {images.map((item, i) => (
          <CarouselLabelBtn
            isActive={currentIndex === i}
            key={`${i}`}
            id={`${i}`}
            onClick={onImageIndicatorClick}
          >
            <img src={urlFor(item).url()} alt='place-photo' />
          </CarouselLabelBtn>
        ))}
      </div>
    </div>
  );
};

export default CarouselPresenter;
