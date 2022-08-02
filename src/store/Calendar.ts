import RootStore from './index';
import { autorun, makeAutoObservable } from 'mobx';
import dayjs from 'dayjs';

const initMonth = dayjs().month();
const initYear = dayjs().year();

class CalendarStore {
  _rootStore: RootStore;
  currMonth: number = initMonth;
  currYear: number = initYear;
  selectDate: number = -1;
  startTime: string = '';
  endTime: string = '';

  constructor(rootStore: RootStore) {
    makeAutoObservable(this);
    this._rootStore = rootStore;
  }

  setCurrMonth = (month: number) => {
    this._rootStore.calendarStore.currMonth = month;
  };
  setCurrYear = (year: number) => {
    this._rootStore.calendarStore.currYear = year;
  };
  setSelectDate = (selectDate: number) => {
    this._rootStore.calendarStore.resetTime();
    this._rootStore.calendarStore.selectDate = selectDate;
  };
  setStartTime = (startTime: string) => {
    this._rootStore.calendarStore.startTime = startTime;
  };
  setEndTime = (endTime: string) => {
    this._rootStore.calendarStore.endTime = endTime;
  };
  resetTime = () => {
    this._rootStore.calendarStore.setStartTime('');
    this._rootStore.calendarStore.setEndTime('');
  };
}

export default CalendarStore;
