import { TDirection } from '../Calendar.entity';

export interface IIndicatorPresenter {
  currMonth: number;
  currYear: number;
  translateDirection: TDirection;
  onArrowClick: (nextMonth: number, dir: string) => void;
}
