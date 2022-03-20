import * as React from 'react';

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
          currentCoords={currentCoords}
        />
      </>
    );
  }, [isSaved, item, isSelected, user, currentCoords]);
};

export default PlaceItemContainer;
