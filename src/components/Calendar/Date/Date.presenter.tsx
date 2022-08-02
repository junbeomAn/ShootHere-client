import TimePicker from '../TimePicker/TimePicker.container';
import { IDatePresenter } from './Date.entity';
import S from './Date.styles';

const DatePresenter = ({
  isActiveDate,
  isHoliday,
  date,
  month,
  sameWithPrevActiveWeek,
  onDateClick,
}: IDatePresenter) => {
  return (
    <S.DateBox isActiveDate={isActiveDate} onClick={() => onDateClick(date)}>
      <S.DateInner>
        <S.Date isHoliday={isHoliday}>{date || ''}</S.Date>
        <TimePicker
          date={date}
          month={month}
          isActiveDate={isActiveDate}
          sameWithPrevActiveWeek={sameWithPrevActiveWeek}
        />
      </S.DateInner>
    </S.DateBox>
  );
};

export default DatePresenter;
