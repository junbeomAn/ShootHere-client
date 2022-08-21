import RootStore from 'store';
import { makeObservable, observable } from 'mobx';
import { TReservation } from './store.entity';
import { ReservationDB } from 'firebase';

class ReservationStore {
  _rootStore: RootStore;
  placeId: string;
  reservation: TReservation = {} as TReservation;
  db: ReservationDB<TReservation>;

  constructor(rootStore: RootStore, database: ReservationDB<TReservation>) {
    makeObservable(this, {
      _rootStore: observable,
      placeId: observable,
    });
    this._rootStore = rootStore;
    this.db = database;
  }

  setPlaceId = (placeId: string) => {
    this._rootStore.reservationStore.placeId = placeId;
  };
  setReservation = ({
    booker,
    extraOrders,
    placeName,
    placeAddress,
  }: {
    booker: string;
    extraOrders: string;
    placeName: string;
    placeAddress: string;
  }) => {
    const { startTime, endTime } = this._rootStore.calendarStore;
    this._rootStore.reservationStore.reservation = {
      booker,
      extraOrders,
      placeName,
      placeAddress,
      startTime,
      endTime,
    };
  };
  resetReservationData = () => {
    this._rootStore.reservationStore.setPlaceId('');
    this._rootStore.reservationStore.reservation = {} as TReservation;
  };
  createReservation = (userId: string) => {
    const r = this._rootStore.reservationStore.reservation;

    this._rootStore.reservationStore.db.write(r, userId);
  };
  getUserReservation = (userId: string) => {
    this._rootStore.reservationStore.db.getUserReservation(userId);
  };
}

export default ReservationStore;
