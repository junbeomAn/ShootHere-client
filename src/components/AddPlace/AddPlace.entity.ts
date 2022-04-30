// import { SanityAsset } from '@sanity/image-url/lib/types/types';
import { SanityAssetDocument } from '@sanity/client';
import { UseFormRegister, FieldValues } from 'react-hook-form';

import { IPlace } from 'components/PlaceItem/PlaceItem.entity';
import { IBase } from 'commonEntity';

export interface IAddPlacePresenter extends IBase {
  register: UseFormRegister<FieldValues>;
  handleSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  onImageChange: (e: React.ChangeEvent) => void;
  errors: { [x: string]: any };
  isUploading: boolean;
  imageAsset: SanityAssetDocument[];
}

export interface IAddPlaceData extends Omit<IPlace, '_id'> {}

export type IUploadAsset = 'file' | 'image';
