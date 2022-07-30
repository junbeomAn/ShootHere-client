import { useEffect, useState } from 'react';
import { useStore } from 'store';
import TimePickerPresenter from './TimePicker.presenter';

import { ITimePickerContainer } from './TimePicker.entity';

const start = 6;
const end = 24;
const times: string[] = [];

for (let i = start; i <= end; i++) {
  times.push(`${i}`);
}

const TimePickerContainer = ({
  isActiveDate,
  sameActiveWeek,
}: ITimePickerContainer) => {
  const [selectMode, setSelectMode] = useState(false);
  const [pointingTime, setPointingTime] = useState('');

  // const [startTime, setStartTime] = useState('');
  // const [endTime, setEndTime] = useState('');
  const {
    calendarStore: { startTime, setStartTime, endTime, setEndTime },
  } = useStore();
  const resetTime = () => {
    setStartTime('');
    setEndTime('');
  };

  const onTimeClick = (e: React.MouseEvent) => {
    // 모드 off 이면
    // 켠다
    // 시작 시간 세팅

    // 모드 on 이면
    // 시작 시간 존재 && 클릭한 게 시작 시간 보다 뒷시간이면
    // 종료시간 세팅, 모드 off
    // 클릭한게 시작 시간보다 앞시간이면
    // 시작 시간 클릭한 것으로 변경
    const { innerText: time } = e.target as HTMLDivElement;

    if (selectMode) {
      if (startTime && startTime < time) {
        setSelectMode(false);
        setEndTime(time);
        setPointingTime('');
      } else if (startTime === time) {
        setSelectMode(false);
        setStartTime('');
      } else {
        setStartTime(time);
      }
      return;
    }
    resetTime();
    setSelectMode(true);
    setStartTime(time);
  };

  const onMouseEnter = (e: React.MouseEvent) => {
    // 모드 off 이면 리턴
    // pointing time setting
    if (!selectMode) return;
    setPointingTime((e.target as HTMLDivElement).innerText);
  };

  const onMouseLeave = () => {
    // 모드 off 이면 리턴
    // pointing time to ''
    if (!selectMode) return;
    setPointingTime('');
  };

  const getSelected = (time: string) => {
    if (startTime && endTime) {
      return startTime <= time && time <= endTime;
    }
    if (startTime === time) return true;

    return startTime <= time && time <= pointingTime;
  };

  useEffect(() => {
    resetTime();
  }, [isActiveDate]);

  return (
    <TimePickerPresenter
      times={times}
      onTimeClick={onTimeClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      getSelected={getSelected}
      isActiveDate={isActiveDate}
      sameActiveWeek={sameActiveWeek}
      startTime={startTime}
      endTime={endTime}
    />
  );
};

export default TimePickerContainer;
