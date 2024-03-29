export interface IPlace {
  _id: string;
  placeName: string;
  address: string;
  minPrice: number;
  maxPrice: number;
  phoneNumber?: string;
  reservationPage?: string;
  longitude: number;
  latitude: number;
}

export interface ICoords {
  // 중복.. common 인터페이스로 빼내야하나..?
  lng: number;
  lat: number;
}

export interface IPlaceItemContainer {
  item: IPlace;
  handlePlaceClick: (placeId: string, placeName: string) => void;
}
export interface IPlaceItemPresenter extends IPlaceItemContainer {
  handleDirectionsClick: (placeName: string) => void;
  handleReservationClick: (id: string) => void;
  isSaved: boolean;
  isSelected: boolean;
  distanceFromCurrentPosition: number;
}

export interface IPlaceItemProps {
  selected: boolean;
}
