import Calendar from 'components/Calendar/Calendar.container';
import Modal from 'components/Modal/Modal.container';

import { IPlace } from 'components/PlaceItem/PlaceItem.entity';
import { EModal, TModal } from 'store/store.entity';
import { getMonth } from 'utils/date';
import S from './Reservation.styles';

const ReservationPresenter = ({
  placeToReserve,
  startTime,
  endTime,
  currMonth,
  currYear,
  selectDate,
  modalType,
  booker,
  extraOrders,
  handleReservationSubmit,
  handleConfirmPayment,
}: {
  placeToReserve: IPlace;
  startTime: string;
  endTime: string;
  currMonth: number;
  currYear: number;
  selectDate: number;
  modalType: TModal;
  booker: string;
  extraOrders: string;
  handleReservationSubmit: (e: React.FormEvent) => void;
  handleConfirmPayment: (e: React.MouseEvent) => void;
}) => {
  return (
    <S.Reservation>
      <Calendar />
      <S.ReserveInfo>
        <S.PlaceName>{placeToReserve.placeName}</S.PlaceName>
        <S.Address>{placeToReserve.address}</S.Address>
        <S.Date>
          {currYear}. {getMonth(currMonth)}. {selectDate}{' '}
          {startTime.split(' ').join('')} ~ {endTime.split(' ').join('')}
        </S.Date>
        <S.Form onSubmit={handleReservationSubmit}>
          <S.ExtraOrdersInput name='extraOrders' placeholder='요청사항' />
          <S.BookerInput name='booker' placeholder='예약자명' required />
          <S.CustomButton type='submit' size='large'>
            제출
          </S.CustomButton>
        </S.Form>
      </S.ReserveInfo>
      {modalType === EModal.PAY && (
        <Modal width='300px' height='240px'>
          <S.PlaceName>{placeToReserve.placeName}</S.PlaceName>
          <S.Date>
            {currYear}. {getMonth(currMonth)}. {selectDate}{' '}
            {startTime.split(' ').join('')} ~ {endTime.split(' ').join('')}
          </S.Date>
          <S.ExtraOrders>{extraOrders}</S.ExtraOrders>
          <S.Booker>{booker}</S.Booker>
          <S.PaymentButton onClick={handleConfirmPayment}>
            결제 하기
          </S.PaymentButton>
        </Modal>
      )}
    </S.Reservation>
  );
};

export default ReservationPresenter;
