import { useStore } from 'store';
import { IDateContainer } from './Date.entity';
import DatePresenter from './Date.presenter';

const DateContainer = ({
  date,
  isHoliday,
  sameWithPrevActiveWeek,
}: IDateContainer) => {
  const {
    calendarStore: { selectDate, setSelectDate },
  } = useStore();

  const onDateClick = (date: number) => {
    if (Number.isNaN(date) || date === 0) return;

    setSelectDate(date);
  };
  const isActiveDate = selectDate === date;

  return (
    <DatePresenter
      isActiveDate={isActiveDate}
      isHoliday={isHoliday}
      date={date}
      sameWithPrevActiveWeek={sameWithPrevActiveWeek}
      onDateClick={onDateClick}
    />
  );
};

export default DateContainer;
