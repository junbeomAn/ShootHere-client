import * as React from 'react';
import getDistance from 'geolib/es/getDistance';

import PlaceItem from './PlaceItem.presenter';

import { usePosition } from '../hooks';
import { PlaceDispatchContext, PlaceContext } from '../context/placeContext';
import { UserContext } from '../context/userContext';
import { IPlaceItemContainer } from './PlaceItem.entity';

const { useContext, useMemo } = React;

const PlaceItemContainer = ({
  item,
  handlePlaceClick,
}: IPlaceItemContainer) => {
  const currentCoords = usePosition();
  const setPlace = useContext(PlaceDispatchContext);
  const currentPlace = useContext(PlaceContext);
  const { user } = useContext(UserContext);

  const handleDirectionsClick = (placeAddress: string) => {
    setPlace(placeAddress);
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
  const isSelected = currentPlace === item.address;
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
          distanceFromCurrentPosition={distanceFromCurrentPosition}
        />
      </>
    );
  }, [isSaved, item, isSelected, user, currentCoords]);
};

export default PlaceItemContainer;
