import Date from '../Date/Date.container';

import { IWeekPresenter } from './Week.entity';
import S from './Week.styles';

const WeekPresenter = ({
  week,
  weekIndex,
  sameWithPrevActiveWeek,
  isActiveWeek,
  onWeekClick,
}: IWeekPresenter) => {
  const weeks = week.map((date, idx) => {
    const isHoliday = idx === 0;

    return (
      <Date
        key={date}
        date={date}
        isHoliday={isHoliday}
        sameWithPrevActiveWeek={sameWithPrevActiveWeek}
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
