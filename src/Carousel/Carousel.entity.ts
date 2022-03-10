import { IPlaceImage } from '../PlaceList/PlaceList.entity';

export interface ICarousel {
  images?: IPlaceImage[];
  placeName: string;
}

export interface ICarouselPresenter extends ICarousel {
  currentIndex: number;
  updateIndex: (index: number) => void;
}

export interface ICarouselItem {
  image?: string;
}
