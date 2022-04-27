import { SanityDocument } from '@sanity/client';

import { IPlace } from 'components/PlaceItem/PlaceItem.entity';
import { IBase } from 'commonEntity/index';

export interface IPlaceListContainer extends IBase {
  data: IPlace[];
}

export interface IPlaceImage {
  _key: string;
  _type: string;
  asset: {
    _ref: string;
    _type: string;
  };
}

export interface IPlaceListPresenter extends IPlaceListContainer {
  handlePlaceClick: (placeId: string, placeName: string) => void;
  images: IPlaceImage[];
  placeName: string;
  loadingRef: React.MutableRefObject<HTMLDivElement>;
  isLastPage: boolean;
}

export interface IPhoto extends SanityDocument {
  place: { _ref: string; _type: string };
  url: IPlaceImage[];
}
