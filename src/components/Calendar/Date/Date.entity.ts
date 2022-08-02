export interface IDateContainer {
  date: number;
  month: number;
  isHoliday: boolean;
  activeWeek: number;
}

export interface IDatePresenter {
  isActiveDate: boolean;
  isHoliday: boolean;
  sameWithPrevActiveWeek: boolean;
  date: number;
  month: number;
  onDateClick: (date: number) => void;
}
