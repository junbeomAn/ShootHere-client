import React from 'react';

import ModalStore from './Modal';
import PlaceStore from './Place';
import UserStore from './User';
import CalendarStore from './Calendar';
import ReservationStore from './Reservation';
import { reservationDb } from '../firebase';

const { createContext, useContext } = React;

class RootStore {
  modalStore: ModalStore;
  placeStore: PlaceStore;
  userStore: UserStore;
  calendarStore: CalendarStore;
  reservationStore: ReservationStore;

  constructor() {
    this.modalStore = new ModalStore(this);
    this.placeStore = new PlaceStore(this);
    this.userStore = new UserStore(this);
    this.calendarStore = new CalendarStore(this);
    this.reservationStore = new ReservationStore(this, reservationDb);
  }
}

export default RootStore;

const StoreContext = createContext<RootStore>(null);

export function useStore() {
  const rootStore = useContext(StoreContext);
  return rootStore;
}
const store = new RootStore();

export const StoreProvider = ({ children }: { children: React.ReactChild }) => {
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};
