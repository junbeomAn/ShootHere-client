export interface IDateContainer {
  date: number;
  isHoliday: boolean;
  sameWithPrevActiveWeek: boolean;
}

export interface IDatePresenter {
  isActiveDate: boolean;
  isHoliday: boolean;
  sameWithPrevActiveWeek: boolean;
  date: number;
  onDateClick: (date: number) => void;
}
