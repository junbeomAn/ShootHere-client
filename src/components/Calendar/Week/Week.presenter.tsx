import Date from '../Date/Date.container';

import { IWeekPresenter } from './Week.entity';
import S from './Week.styles';

const WeekPresenter = ({
  month,
  week,
  weekIndex,
  isActiveWeek,
  onWeekClick,
  activeWeek,
}: IWeekPresenter) => {
  let extraKey = 0;

  const weeks = week.map((date, idx) => {
    const isHoliday = idx === 0;

    return (
      <Date
        key={`${month}-${date === 0 ? extraKey-- : date}-date`}
        month={month}
        date={date}
        isHoliday={isHoliday}
        activeWeek={activeWeek}
      />
    );
  });
  return (
    <S.Week
      isActiveWeek={isActiveWeek}
      onClick={onWeekClick}
      data-week={weekIndex}
    >
      {weeks}
    </S.Week>
  );
};

export default WeekPresenter;
