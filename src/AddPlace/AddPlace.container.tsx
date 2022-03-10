import * as React from 'react';
import { useForm } from 'react-hook-form';
import { SanityAsset } from '@sanity/image-url/lib/types/types';
import { nanoid } from 'nanoid';

import AddPlacePresenter from './AddPlace.presenter';
import { client } from '../api/client';

import { IAddPlaceData } from './AddPlace.entity';

const { useState } = React;

const AddPlace = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [imageAsset, setImageAsset] = useState<SanityAsset[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();

  const onSubmit = (data: IAddPlaceData) => {
    setIsLoading(true);

    const newPlaceDoc = {
      _type: 'place',
      ...data,
      minPrice: Number(data.minPrice),
      maxPrice: Number(data.maxPrice),
    };

    client.create(newPlaceDoc).then((res) => {
      const imageDoc = {
        _type: 'photo',
        place: {
          _ref: res?._id,
          _type: 'reference',
        },
        url: imageAsset?.map((item) => ({
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: item?._id,
          },
          _key: nanoid(),
        })),
      };
      client.create(imageDoc).then((res) => {
        reset();
        setImageAsset([]);
        setIsLoading(false);
        alert('장소 등록이 완료되었습니다.');
      });
    });
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    const { type, name } = files[0];

    if (
      type !== 'image/png' &&
      type !== 'image/svg' &&
      type !== 'image/tiff' &&
      type !== 'image/jpeg'
    ) {
      alert('잘못된 이미지 형식입니다. 다시 시도해주세요.');
      return;
    }
    setIsUploading(true);

    client.assets
      .upload('image', files[0], {
        contentType: type,
        filename: name,
      })
      .then((asset) => {
        setImageAsset([...imageAsset, asset]);
        setIsUploading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
      <AddPlacePresenter
        register={register}
        handleSubmit={handleSubmit(onSubmit)}
        onChange={onChange}
        errors={errors}
        isLoading={isLoading}
        isUploading={isUploading}
        imageAsset={imageAsset}
      />
    </>
  );
};

export default AddPlace;
