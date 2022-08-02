export enum EModal {
  NONE = 'NONE',
  LOGIN = 'LOGIN',
  CAROUSEL = 'CAROUSEL',
  PAY = 'PAY',
}

export type TModal = EModal.NONE | EModal.LOGIN | EModal.CAROUSEL | EModal.PAY;

export interface TReservation {
  booker: string;
  placeName: string;
  placeAddress: string;
  startTime: string;
  endTime: string;
  extraOrders: string;
}
