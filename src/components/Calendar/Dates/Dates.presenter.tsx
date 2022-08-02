import dayjs from 'dayjs';
import localeData from 'dayjs/plugin/localeData';

import Week from '../Week/Week.presenter';
import { IDatesPresenter } from './Dates.entity';

import S from './Dates.styles';

dayjs.extend(localeData);

const DatesPresenter = ({
  month,
  calendarDates,
  activeWeek,
  onWeekClick,
}: IDatesPresenter) => {
  return (
    <S.Dates>
      {calendarDates.map((week, i) => {
        const isActiveWeek = activeWeek === i;

        return (
          <Week
            key={`${month}-${i}-week`}
            month={month}
            week={week}
            weekIndex={i}
            onWeekClick={onWeekClick}
            isActiveWeek={isActiveWeek}
            activeWeek={activeWeek}
          />
        );
      })}
    </S.Dates>
  );
};

export default DatesPresenter;
