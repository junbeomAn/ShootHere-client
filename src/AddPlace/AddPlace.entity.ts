import { SanityAsset } from '@sanity/image-url/lib/types/types';
import { IPlace } from '../PlaceItem/PlaceItem.entity';
import {
  UseFormRegister,
  UseFormHandleSubmit,
  FieldValues,
} from 'react-hook-form';
import { IBase } from '../commonEntity';

export interface IAddPlacePresenter extends IBase {
  register: UseFormRegister<FieldValues>;
  handleSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  onChange: (e: React.ChangeEvent) => void;
  errors: { [x: string]: any };
  isUploading: boolean;
  imageAsset: SanityAsset[];
}

export interface IAddPlaceData extends Omit<IPlace, '_id'> {}
