/** @jsx jsx */

import { jsx } from '@emotion/react';
import * as React from 'react';
import { MdOutlineUploadFile } from 'react-icons/md';
import { BeatLoader } from 'react-spinners';

import Input from 'components/Input/Input.presenter';
import Spinner from 'components/Spinner/Spinner.presenter';

import { IAddPlacePresenter, IFutsalInfoFields } from './AddPlace.entity';

import {
  addPlaceStyles,
  errorMessageStyles,
  uploadAreaStyles,
  uploadContainerStyles,
  inputSubmitStyles,
  uploadInputStyles,
  uploadImagePreviewStyles,
  addPlaceInputCustomStyles,
} from './AddPlace.styles';

const futsalInfoFields: IFutsalInfoFields = {
  placeName: '이름',
  address: '주소',
  phoneNumber: '전화번호',
  reservationPage: '예약 페이지',
  minPrice: '최소 대관료',
  maxPrice: '최대 대관료',
};

const IMAGE_UPLOAD_MSG = '클릭해서 이미지를 업로드 하세요';
const ADD_PLACE_TITLE = '풋살장 정보 등록';
const IMAGE_UPLOAD_TITLE = '이미지 업로드';
const NO_IMAGE_MSG = '업로드할 이미지가 없습니다.';

const AddPlacePresenter = ({
  register,
  handleSubmit,
  onImageChange,
  errors,
  isLoading,
  isUploading,
  imageAsset,
}: IAddPlacePresenter) => {
  const getCurrentError = (errors: { [x: string]: any }) => {
    return Object.keys(futsalInfoFields).find(
      (field) => errors[field] && field
    );
  };
  const error = getCurrentError(errors);

  // required는 이름, 주소만
  const inputFields = Object.entries(futsalInfoFields).map(
    ([field, value], i) => (
      <Input
        id={field}
        key={field}
        name={field}
        error={field === error}
        label={value}
        required={i < 2}
        register={register}
        style={addPlaceInputCustomStyles}
      />
    )
  );

  const getUploadableImages = () =>
    imageAsset?.map((item) => (
      <img key={item._id} src={item?.url} alt='upload-photo' />
    ));

  const getUploadState = () => (
    <h3>{isUploading ? <BeatLoader size={10} /> : IMAGE_UPLOAD_MSG}</h3>
  );

  const getSubmitButton = () =>
    isLoading ? (
      <div css={inputSubmitStyles}>
        <Spinner
          style={{
            width: '16px',
            height: '16px',
            borderWidth: '2px',
          }}
        />
        {/* <BeatLoader size={10} /> */}
      </div>
    ) : (
      <input css={inputSubmitStyles} type='submit' value={'등록'} />
    );

  const getInputError = (error: string) =>
    `${error} 항목이 입력되지 않았습니다.`;
  const isUploadImageEmpty = imageAsset.length === 0;

  return (
    <form css={addPlaceStyles} onSubmit={handleSubmit}>
      <h2>{ADD_PLACE_TITLE}</h2>
      {error && (
        <span css={errorMessageStyles}>
          {getInputError(futsalInfoFields[error])}
        </span>
      )}
      {inputFields}
      <label css={uploadContainerStyles}>
        <h3>{IMAGE_UPLOAD_TITLE}</h3>
        <div css={uploadImagePreviewStyles}>
          {isUploadImageEmpty && <span>{NO_IMAGE_MSG}</span>}
          {getUploadableImages()}
        </div>
        <div css={uploadAreaStyles}>
          <MdOutlineUploadFile />
          {getUploadState()}
        </div>
        <input css={uploadInputStyles} type='file' onChange={onImageChange} />
      </label>
      {getSubmitButton()}
    </form>
  );
};

export default AddPlacePresenter;
