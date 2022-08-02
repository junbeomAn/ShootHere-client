export interface IDatesPresenter {
  month: number;
  calendarDates: number[][];
  activeWeek: number;
  onWeekClick: (e: React.MouseEvent) => void;
}
