import * as React from 'react';

import PlaceList from './PlaceList.presenter';
import { IPlaceListContainer, IPhoto, IPlaceImage } from './PlaceList.entity';
import { ModalContext } from '../context/modalContext';
import { client } from '../api/client';
import { getPlaceImagesQuery } from '../api/query';

const { useState, useContext } = React;

const PlaceListContainer = ({ data, isLoading }: IPlaceListContainer) => {
  const [images, setImages] = useState<IPlaceImage[]>([]);
  const [placeName, setPlaceName] = useState('');

  const { setIsOpen } = useContext(ModalContext);

  const handlePlaceClick = (placeId: string, name: string) => {
    client.fetch<IPhoto[]>(getPlaceImagesQuery(placeId)).then((res) => {
      const [data] = res;

      setImages(data ? data.url : []);
      setPlaceName(name);
      setIsOpen(true);
    });
  };

  return (
    <>
      <PlaceList
        data={data}
        isLoading={isLoading}
        handlePlaceClick={handlePlaceClick}
        images={images}
        placeName={placeName}
      />
    </>
  );
};

export default PlaceListContainer;
