export interface ITimePickerContainer {
  isActiveDate: boolean;
  sameActiveWeek: boolean;
}

export interface ITimePickerPresenter {
  times: string[];
  onTimeClick: (e: React.MouseEvent) => void;
  onMouseEnter: (e: React.MouseEvent) => void;
  onMouseLeave: () => void;
  getSelected: (time: string) => boolean;
  isActiveDate: boolean;
  sameActiveWeek: boolean;
  startTime: string;
  endTime: string;
}
