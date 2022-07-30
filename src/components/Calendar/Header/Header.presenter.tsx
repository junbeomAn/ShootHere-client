import dayjs from 'dayjs';
import localeData from 'dayjs/plugin/localeData';

import S from './Header.styles';

dayjs.extend(localeData);

const HeaderPresenter = () => {
  return (
    <S.Header>
      {dayjs.weekdaysShort().map((day) => (
        <S.Day key={day}>
          <S.DayInner>{day.toUpperCase()}</S.DayInner>
        </S.Day>
      ))}
    </S.Header>
  );
};

export default HeaderPresenter;
