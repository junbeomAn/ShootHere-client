import RootStore from 'store';
import { makeAutoObservable } from 'mobx';

class PlaceStore {
  _rootStore: RootStore;
  placeAddress: string = '';
  currentCity: string = '';

  constructor(rootStore: RootStore) {
    makeAutoObservable(this);
    this._rootStore = rootStore;
  }

  setPlaceAddress = (newPlaceAddr: string) => {
    this._rootStore.placeStore.placeAddress = newPlaceAddr;
  };
  setCurrentCity = (currCity: string) => {
    this._rootStore.placeStore.currentCity = currCity;
  };
}

export default PlaceStore;
