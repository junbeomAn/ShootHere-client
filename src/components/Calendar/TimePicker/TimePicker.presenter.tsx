import S from './TimePicker.styles';
import { ITimePickerPresenter } from './TimePicker.entity';
import { stopPropagation } from 'utils';

const TimePickerPresenter = ({
  times,
  onTimeClick,
  onMouseEnter,
  onMouseLeave,
  getSelected,
  isActiveDate,
  sameWithPrevActiveWeek,
  startTime,
  endTime,
  date,
  month,
}: ITimePickerPresenter) => {
  const slots = times.map((time) => {
    const displayTime = `${time.padStart(2, '0')} : 00`;
    const isSelected = getSelected(displayTime);
    const isStart = startTime === displayTime;
    const isEnd = endTime === displayTime;

    return (
      <S.Slot
        key={`${month}-${date}-${time.split(':').join('')}`}
        isSelected={isSelected}
        isStart={isStart}
        isEnd={isEnd}
        onClick={stopPropagation(onTimeClick)}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {displayTime}
      </S.Slot>
    );
  });

  return (
    <S.TimePicker
      isActiveDate={isActiveDate}
      sameWithPrevActiveWeek={sameWithPrevActiveWeek}
    >
      {slots}
    </S.TimePicker>
  );
};

export default TimePickerPresenter;
