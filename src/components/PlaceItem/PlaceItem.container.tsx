import * as React from 'react';
import getDistance from 'geolib/es/getDistance';
import { isMobile } from 'react-device-detect';
import { observer } from 'mobx-react';

import PlaceItem from './PlaceItem.presenter';

import { usePosition } from 'hooks';

import { IPlaceItemContainer } from './PlaceItem.entity';
import { useStore } from 'store';

const { useMemo } = React;

const PlaceItemContainer = ({
  item,
  handlePlaceClick,
}: IPlaceItemContainer) => {
  const currentCoords = usePosition();
  const {
    userStore: { user },
    placeStore: { placeAddress, setPlaceAddress },
    reservationStore: { setPlaceId },
  } = useStore();

  const getNMapUrlScheme = () => {
    return `
    nmap://route/car?dlat=${item.latitude}&dlng=${
      item.longitude
    }&dname=${encodeURIComponent(item.placeName)}&appname=shoot-here
    `;
  };

  const handleDirectionsClick = (placeAddress: string) => {
    if (isMobile) {
      window.location.href = getNMapUrlScheme();
    } else {
      setPlaceAddress(placeAddress);
    }
  };

  const handleReservationClick = (id: string) => {
    setPlaceId(id);
  };

  const distanceFromCurrentPosition: number = useMemo(() => {
    return currentCoords.lat
      ? getDistance(
          {
            longitude: item.longitude,
            latitude: item.latitude,
          },
          {
            longitude: currentCoords.lng,
            latitude: currentCoords.lat,
          },
          0.1
        )
      : 0;
  }, [currentCoords.lat]);

  const isSaved = !!user?.save?.find((place) => place._ref === item._id);
  const isSelected = placeAddress === item.address;
  // is saved 로 필터를 시킬 수있다.

  // memo로 불필요한 리렌더링 방지.. 특히 save 바뀔때 모든 아이템 리렌더링 최적화
  return useMemo(() => {
    return (
      <>
        <PlaceItem
          isSelected={isSelected}
          isSaved={isSaved}
          item={item}
          handleDirectionsClick={handleDirectionsClick}
          handlePlaceClick={handlePlaceClick}
          handleReservationClick={handleReservationClick}
          distanceFromCurrentPosition={distanceFromCurrentPosition}
        />
      </>
    );
  }, [isSaved, item, isSelected, user, currentCoords]);
};

export default observer(PlaceItemContainer);
