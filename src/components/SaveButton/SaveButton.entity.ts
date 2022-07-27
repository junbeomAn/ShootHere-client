export interface ISaveButtonPresenter {
  setMouseOut: React.Dispatch<React.SetStateAction<boolean>>;
  isSaved: boolean;
  mouseOver: boolean;
  handleSaveClick: (id: string) => void;
  placeId: string;
}

export interface ISaveButton {
  isSaved: boolean;
  placeId: string;
}
