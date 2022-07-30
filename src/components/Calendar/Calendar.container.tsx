import { useState } from 'react';
import dayjs from 'dayjs';
import { observer } from 'mobx-react';

import Header from './Header/Header.presenter';
import Dates from './Dates/Dates.presenter';
import Indicator from './Indicator/Indicator.presenter';

import { getNewYearMonth } from 'utils/date';
import { useStore } from 'store';
import usePrevious from 'hooks/usePrevious';

import S from './Calendar.styles';
import { TDirection } from './Calendar.entity';

const calendarWidth = 630;

const CalendarContainer = () => {
  const [activeWeek, setActiveWeek] = useState(-1);
  const [translateDirection, setTranslateDirection] = useState<TDirection>('');
  const prevActiveWeek = usePrevious(activeWeek);
  const {
    calendarStore: {
      currMonth,
      setCurrMonth,
      currYear,
      setCurrYear,
      setSelectDate,
    },
  } = useStore();

  const resetCalendar = () => {
    setSelectDate(-1);
    setActiveWeek(-1);
  };

  const handleWeekClick = (e: React.MouseEvent) => {
    const { week } = (e.currentTarget as HTMLDivElement).dataset;

    setActiveWeek(Number(week));
  };

  const handleArrowClick = (nextMonth: number, dir: TDirection) => {
    resetCalendar();
    setTranslateDirection(dir);

    const [year, mon] = getNewYearMonth(currYear, nextMonth);

    setTimeout(() => {
      setTranslateDirection('');
      setCurrMonth(mon);
      setCurrYear(year);
    }, 400);
  };

  const createCalendarDates = (year: number, mon: number) => {
    const monObj = dayjs().year(year).month(mon);
    const lastDate = monObj.endOf('month').date();
    const calendarDates = [];

    let currWeek: number[] = new Array(7).fill(0);

    for (let i = 1; i <= lastDate; i++) {
      const dayIndex = monObj.date(i).day();
      currWeek[dayIndex] = i;

      if (dayIndex === 6) {
        calendarDates.push(currWeek);
        currWeek = new Array(7).fill(0);
      }
    }
    calendarDates.push(currWeek);
    return calendarDates;
  };

  const monthsToRender = [currMonth - 1, currMonth, currMonth + 1];

  const monthsCalendar = monthsToRender.map((m) => (
    <Dates
      key={`${currYear}/${m}`}
      calendarDates={createCalendarDates(currYear, m)}
      activeWeek={currMonth === m ? activeWeek : -1}
      prevActiveWeek={prevActiveWeek}
      onWeekClick={handleWeekClick}
    />
  ));

  return (
    <>
      <Indicator
        currMonth={currMonth}
        currYear={currYear}
        onArrowClick={handleArrowClick}
        translateDirection={translateDirection}
      />
      <S.Calendar>
        <Header />
        <S.SliderBox
          width={calendarWidth}
          translateDirection={translateDirection}
        >
          {monthsCalendar}
        </S.SliderBox>
      </S.Calendar>
    </>
  );
};

export default observer(CalendarContainer);
