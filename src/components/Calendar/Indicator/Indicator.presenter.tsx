import dayjs from 'dayjs';
import localeData from 'dayjs/plugin/localeData';

import { getNewYearMonth } from 'utils/date';

import S from './Indicator.styles';

import { IIndicatorPresenter } from './Indicator.entity';

dayjs.extend(localeData);

const getMonth = (mon: number) => {
  const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  return months[mon];
};

const IndicatorContainer = ({
  currMonth,
  currYear,
  translateDirection,
  onArrowClick,
}: IIndicatorPresenter) => {
  const getYearTranslateDir = (mon: number, dir: string) => {
    if (mon === 11 && dir === 'right') {
      return 'right';
    } else if (mon === 0 && dir === 'left') {
      return 'left';
    }
    return '';
  };

  const [_, prevMonth] = getNewYearMonth(currYear, currMonth - 1);
  const [__, nextMonth] = getNewYearMonth(currYear, currMonth + 1);

  return (
    <S.Indicator>
      <S.IndicatorButton
        onClick={() => onArrowClick(currMonth - 1, 'left')}
        left
      ></S.IndicatorButton>
      <S.Container dir='col'>
        <S.Container dir={'row'} width={30}>
          <S.SliderBox width={30} translateDirection={translateDirection}>
            <S.Month>{getMonth(prevMonth)}</S.Month>
            <S.Month>{getMonth(currMonth)}</S.Month>
            <S.Month>{getMonth(nextMonth)}</S.Month>
          </S.SliderBox>
        </S.Container>
        <S.Container dir={'row'} width={60}>
          <S.SliderBox
            width={60}
            translateDirection={getYearTranslateDir(
              currMonth,
              translateDirection
            )}
          >
            <S.Year>{currYear - 1}</S.Year>
            <S.Year>{currYear}</S.Year>
            <S.Year>{currYear + 1}</S.Year>
          </S.SliderBox>
        </S.Container>
      </S.Container>
      <S.IndicatorButton
        onClick={() => onArrowClick(currMonth + 1, 'right')}
        right
      ></S.IndicatorButton>
    </S.Indicator>
  );
};

export default IndicatorContainer;
