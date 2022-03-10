/** @jsx jsx */

import { jsx } from '@emotion/react';
import * as React from 'react';
import { MdOutlineUploadFile } from 'react-icons/md';

import Input from '../Input/Input.presenter';

import { IAddPlacePresenter } from './AddPlace.entity';
import {
  addPlaceStyles,
  errorMessageStyles,
  uploadAreaStyles,
  uploadContainerStyles,
} from './AddPlace.styles';

import { inputSubmitStyles } from './AddPlace.styles';
import { uploadInputStyles } from './AddPlace.styles';
import { uploadImagePreviewStyles } from './AddPlace.styles';

const futsalInfoFields = {
  placeName: '이름',
  address: '주소',
  phoneNumber: '전화번호',
  reservationPage: '예약 페이지',
  minPrice: '최소 대관료',
  maxPrice: '최대 대관료',
};

const AddPlacePresenter = ({
  register,
  handleSubmit,
  onChange,
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

  const inputFields = Object.entries(futsalInfoFields).map(([field, value]) => (
    <Input
      id={field}
      key={field}
      name={field}
      error={field === error}
      label={value}
      register={register}
      style={`
        border-bottom: 2px solid #d0d0d0;
        padding: 5px 10px;
        margin-bottom: 28px;
      `}
    />
  ));

  return (
    <form css={addPlaceStyles} onSubmit={handleSubmit}>
      <h2>풋살장 정보 등록</h2>
      {error && (
        <span css={errorMessageStyles}>{error} field is required.</span>
      )}
      {inputFields}

      <label css={uploadContainerStyles}>
        <h3>이미지 업로드</h3>
        <div css={uploadImagePreviewStyles}>
          {imageAsset.length === 0 && <span>업로드할 이미지가 없습니다.</span>}
          {imageAsset?.map((item) => (
            <img key={item._id} src={item?.url} alt='upload-photo' />
          ))}
        </div>
        <div css={uploadAreaStyles}>
          <MdOutlineUploadFile />
          <h3>
            {isUploading
              ? '이미지를 업로드하는 중입니다...'
              : '클릭해서 이미지를 업로드 하세요'}
          </h3>
        </div>
        <input css={uploadInputStyles} type='file' onChange={onChange} />
      </label>

      <input
        css={inputSubmitStyles}
        type='submit'
        value={isLoading ? '등록중..' : '등록'}
      />
    </form>
  );
};

export default AddPlacePresenter;
