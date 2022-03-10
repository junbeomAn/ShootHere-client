export interface IPlace {
  _id: string;
  placeName: string;
  address: string;
  minPrice: number;
  maxPrice: number;
  phoneNumber?: string;
  reservationPage?: string;
}

export interface IPlaceItemContainer {
  item: IPlace;
  handlePlaceClick: (placeId: string, placeName: string) => void;
}
export interface IPlaceItem extends IPlaceItemContainer {
  handleDirectionsClick: (placeName: string) => void;
  isSaved: boolean;
  isSelected: boolean;
}

export interface IPlaceItemProps {
  selected: boolean;
}

export interface ISaveButton {
  isSaved: boolean;
  placeId: string;
  // onClick: (e: React.MouseEvent) => void;
}
