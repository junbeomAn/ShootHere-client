import TimePicker from '../TimePicker/TimePicker.container';
import { IDatePresenter } from './Date.entity';
import S from './Date.styles';

const DatePresenter = ({
  isActiveDate,
  isHoliday,
  date,
  sameWithPrevActiveWeek,
  onDateClick,
}: IDatePresenter) => {
  return (
    <S.DateBox isActiveDate={isActiveDate} onClick={() => onDateClick(date)}>
      <S.DateInner>
        <S.Date isHoliday={isHoliday}>{date || ''}</S.Date>
        <TimePicker
          isActiveDate={isActiveDate}
          sameActiveWeek={sameWithPrevActiveWeek}
        />
      </S.DateInner>
    </S.DateBox>
  );
};

export default DatePresenter;
