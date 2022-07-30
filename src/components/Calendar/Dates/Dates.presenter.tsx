import dayjs from 'dayjs';
import localeData from 'dayjs/plugin/localeData';

import Week from '../Week/Week.presenter';
import { IDatesPresenter } from './Dates.entity';

import S from './Dates.styles';

dayjs.extend(localeData);

const DatesContainer = ({
  calendarDates,
  activeWeek,
  prevActiveWeek,
  onWeekClick,
}: IDatesPresenter) => {
  const sameWithPrevActiveWeek = activeWeek === prevActiveWeek;

  return (
    <S.Dates>
      {calendarDates.map((week, i) => {
        const isActiveWeek = activeWeek === i;

        return (
          <Week
            key={i}
            week={week}
            weekIndex={i}
            onWeekClick={onWeekClick}
            sameWithPrevActiveWeek={sameWithPrevActiveWeek}
            isActiveWeek={isActiveWeek}
          />
        );
      })}
    </S.Dates>
  );
};

export default DatesContainer;
