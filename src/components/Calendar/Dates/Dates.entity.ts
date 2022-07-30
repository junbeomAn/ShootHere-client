export interface IDatesPresenter {
  calendarDates: number[][];
  activeWeek: number;
  prevActiveWeek: number;
  onWeekClick: (e: React.MouseEvent) => void;
  // onDateClick: (data: number) => void;
  // selectDate: number;
}
