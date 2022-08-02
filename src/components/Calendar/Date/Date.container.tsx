import usePrevious from 'hooks/usePrevious';
import { observer } from 'mobx-react';
import { useEffect } from 'react';
import { useStore } from 'store';
import { IDateContainer } from './Date.entity';
import DatePresenter from './Date.presenter';

const DateContainer = ({
  date,
  month,
  isHoliday,
  activeWeek,
}: IDateContainer) => {
  const {
    calendarStore: { selectDate, setSelectDate, setStartTime, setEndTime },
  } = useStore();
  const prevActiveWeek = usePrevious(activeWeek);
  const handleDateClick = (date: number) => {
    if (Number.isNaN(date) || date === 0) return;

    setSelectDate(date);
  };
  const isActiveDate = selectDate === date;
  const sameWithPrevActiveWeek = activeWeek === prevActiveWeek;

  return (
    <DatePresenter
      isActiveDate={isActiveDate}
      isHoliday={isHoliday}
      date={date}
      month={month}
      sameWithPrevActiveWeek={sameWithPrevActiveWeek}
      onDateClick={handleDateClick}
    />
  );
};

export default observer(DateContainer);
