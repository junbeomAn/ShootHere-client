export interface IWeekPresenter {
  week: number[];
  weekIndex: number;
  sameWithPrevActiveWeek: boolean;
  isActiveWeek: boolean;
  onWeekClick: (e: React.MouseEvent) => void;
}
