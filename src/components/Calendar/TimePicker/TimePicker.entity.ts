export interface ITimePickerContainer {
  date: number;
  month: number;
  isActiveDate: boolean;
  sameWithPrevActiveWeek: boolean;
}

export interface ITimePickerPresenter {
  times: string[];
  onTimeClick: (e: React.MouseEvent) => void;
  onMouseEnter: (e: React.MouseEvent) => void;
  onMouseLeave: () => void;
  getSelected: (time: string) => boolean;
  isActiveDate: boolean;
  sameWithPrevActiveWeek: boolean;
  startTime: string;
  endTime: string;
  date: number;
  month: number;
}
