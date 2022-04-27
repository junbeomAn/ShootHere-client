import * as React from 'react';

import { ICarousel } from './Carousel.entity';
import CarouselPresenter from './Carousel.presenter';

const { useState } = React;

const CarouselContainer = ({ placeName, images }: ICarousel) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const updateIndex = (index: number) => {
    const lastIndex = images.length - 1;
    let nextIndex: number = index;

    if (index < 0) {
      nextIndex = lastIndex;
    } else if (index > lastIndex) {
      nextIndex = 0;
    }

    setCurrentIndex(nextIndex);
  };

  return (
    <>
      <CarouselPresenter
        currentIndex={currentIndex}
        updateIndex={updateIndex}
        images={images}
        placeName={placeName}
      />
    </>
  );
};

export default CarouselContainer;
