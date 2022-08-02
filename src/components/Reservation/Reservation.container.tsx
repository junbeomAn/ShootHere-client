import { useEffect } from 'react';
import useSWR from 'swr';
import { observer } from 'mobx-react';
import { useNavigate } from 'react-router-dom';

import ReservationPresenter from './Reservation.presenter';

import { getPlaceSearchQuery } from 'api/query';
import { sanityFetcher } from 'hooks/swrFetcher';
import { useStore } from 'store';
import { getFormValues, userUtils } from 'utils';

import { IPlace } from 'components/PlaceItem/PlaceItem.entity';
import { EModal } from 'store/store.entity';

const ReservationContainer = () => {
  const {
    reservationStore: {
      placeId,
      setReservation,
      reservation,
      createReservation,
    },
    placeStore: { currentCity },
    calendarStore: { startTime, endTime, currMonth, currYear, selectDate },
    modalStore: { modalType, setModal },
  } = useStore();
  const {
    data = [],
    error: placeError,
    isValidating,
  } = useSWR<IPlace[]>(
    currentCity ? getPlaceSearchQuery(currentCity) : null,
    sanityFetcher
  );
  const navigate = useNavigate();

  const handleReservationSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const values = getFormValues(e.target as HTMLFormElement, [
      'booker',
      'extraOrders',
    ]);

    setReservation({
      booker: values.booker,
      extraOrders: values.extraOrders,
      placeName: placeToReserve.placeName,
      placeAddress: placeToReserve.address,
    });
    setModal(EModal.PAY);
  };

  const handleConfirmPayment = () => {
    // reset reservation
    // reset placeId
    // modal close
    // navigate to home
    // calendar reset -> start, end time,  curr month, year, selected date
    //
    console.log('payment success');
    const user = userUtils.getUser();

    createReservation(user._id);
  };

  useEffect(() => {
    if (!placeId) navigate('/', { replace: true });
  }, []);

  const placeToReserve = data.find((item) => item._id === placeId);

  if (!placeId) return null;

  return (
    <ReservationPresenter
      placeToReserve={placeToReserve}
      startTime={startTime}
      endTime={endTime}
      currMonth={currMonth}
      currYear={currYear}
      selectDate={selectDate}
      modalType={modalType}
      booker={reservation.booker}
      extraOrders={reservation.extraOrders}
      handleReservationSubmit={handleReservationSubmit}
      handleConfirmPayment={handleConfirmPayment}
    />
  );
};

export default observer(ReservationContainer);
