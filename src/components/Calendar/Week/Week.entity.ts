export interface IWeekPresenter {
  month: number;
  week: number[];
  weekIndex: number;
  isActiveWeek: boolean;
  onWeekClick: (e: React.MouseEvent) => void;
  activeWeek: number;
}
