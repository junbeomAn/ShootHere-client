import S from './TimePicker.styles';
import { ITimePickerPresenter } from './TimePicker.entity';

const TimePickerPresenter = ({
  times,
  onTimeClick,
  onMouseEnter,
  onMouseLeave,
  getSelected,
  isActiveDate,
  sameActiveWeek,
  startTime,
  endTime,
}: ITimePickerPresenter) => {
  const slots = times.map((time) => {
    const displayTime = `${time.padStart(2, '0')} : 00`;
    const isSelected = getSelected(displayTime);
    const isStart = startTime === displayTime;
    const isEnd = endTime === displayTime;

    return (
      <S.Slot
        key={time.split(':').join('')}
        isSelected={isSelected}
        isStart={isStart}
        isEnd={isEnd}
        onClick={onTimeClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {displayTime}
      </S.Slot>
    );
  });
  return (
    <S.TimePicker isActiveDate={isActiveDate} sameActiveWeek={sameActiveWeek}>
      {slots}
    </S.TimePicker>
  );
};

export default TimePickerPresenter;
