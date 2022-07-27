import RootStore from 'store';
import { makeAutoObservable } from 'mobx';

class PlaceStore {
  _rootStore: RootStore;
  place: string = '';

  constructor(rootStore: RootStore) {
    makeAutoObservable(this);
    this._rootStore = rootStore;
  }

  setPlace = (newPlace: string) => {
    this._rootStore.placeStore.place = newPlace;
  };
}

export default PlaceStore;
