import * as React from 'react';
import { useForm } from 'react-hook-form';
import { nanoid } from 'nanoid';
import { SanityAssetDocument } from '@sanity/client';

import AddPlacePresenter from './AddPlace.presenter';
import { client } from 'api/client';
import useAxios from 'hooks/useAxios';
import { createQueryString } from 'utils';
import { CustomError } from 'utils/error';

import { IAddPlaceData } from './AddPlace.entity';
import { IXYCoords } from 'commonEntity';

const { useState, useEffect } = React;
const WRONG_IMG_TYPE = '잘못된 이미지 형식입니다. 다시 시도해주세요.';
const PLACE_REGISTER_COMPLETE = '장소 등록이 완료되었습니다.';
const PLACE_REGISTER_FAIL = '장소 등록 요청에 실패하였습니다.';

const AddPlace = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [imageAsset, setImageAsset] = useState<SanityAssetDocument[]>([]);
  const {
    data: coords,
    getData: getCoords,
    cancelRequest,
    error,
  } = useAxios<IXYCoords[]>({
    loadOnMount: false,
    config: { url: `/api/map/coords` },
    defaultValue: [],
  });
  const {
    register,
    handleSubmit: handleHooksFormSubmit,
    formState: { errors },
    watch,
    reset,
    setError,
  } = useForm();

  const createImageUrlDocumentData = (item: SanityAssetDocument) => ({
    _type: 'image',
    asset: {
      _type: 'reference',
      _ref: item?._id,
    },
    _key: nanoid(),
  });

  const getNewPlaceCoords = async (address: string) => {
    const qs = createQueryString({ query: address });
    try {
      await getCoords(qs);
      const [result] = coords;

      if (!result) {
        throw new CustomError('존재하지 않는 주소이거나, 잘못된 주소입니다.');
      }

      const { x: longitude, y: latitude } = result;
      return { longitude, latitude };
    } catch (err) {
      if (err instanceof CustomError) {
        setError('address', { message: err.message }, { shouldFocus: true });
      }
      throw err;
    }
  };

  const createNewPlaceDocument = async (
    data: IAddPlaceData & { longitude: number; latitude: number }
  ) => {
    const newPlaceData = {
      _type: 'place',
      ...data,
      minPrice: Number(data.minPrice),
      maxPrice: Number(data.maxPrice),
    };
    const res = await client.create(newPlaceData);
    return res;
  };

  const createNewImageDocument = (
    refPlaceId: string,
    imageAsset: SanityAssetDocument[]
  ) => {
    const newImageData = {
      _type: 'photo',
      place: {
        _ref: refPlaceId,
        _type: 'reference',
      },
      url: imageAsset?.map(createImageUrlDocumentData),
    };
    client.create(newImageData);
  };

  const resetData = () => {
    reset();
    setImageAsset([]);
  };

  const handleSubmit = async (newData: IAddPlaceData) => {
    setIsLoading(true);
    try {
      const { longitude, latitude } = await getNewPlaceCoords(newData.address);
      const res = await createNewPlaceDocument({
        ...newData,
        longitude,
        latitude,
      });
      await createNewImageDocument(res?._id, imageAsset);

      resetData();
      alert(PLACE_REGISTER_COMPLETE);
    } catch (err) {
      alert(PLACE_REGISTER_FAIL);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const isProperImage = (type: string) => {
    return (
      type === 'image/png' ||
      type === 'image/svg' ||
      type === 'image/tiff' ||
      type === 'image/jpeg'
    );
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    const { type, name } = files[0];
    try {
      if (!isProperImage(type)) {
        throw new CustomError(WRONG_IMG_TYPE);
      }
      setIsUploading(true);

      const uploadOptions = {
        contentType: type,
        filename: name,
      };

      const asset = await client.assets.upload(
        'image',
        files[0],
        uploadOptions
      );
      setImageAsset([...imageAsset, asset]);
    } catch (err) {
      if (err instanceof CustomError) {
        alert(err.message);
        err.log();
      }
    } finally {
      setIsUploading(false);
    }
  };

  useEffect(() => {
    return () => cancelRequest();
  }, []);

  return (
    <>
      <AddPlacePresenter
        register={register}
        handleSubmit={handleHooksFormSubmit(handleSubmit)}
        onImageChange={handleImageChange}
        errors={errors}
        isLoading={isLoading}
        isUploading={isUploading}
        imageAsset={imageAsset}
      />
    </>
  );
};

export default AddPlace;
