import * as React from 'react';
import { observer } from 'mobx-react';

import MapPresenter from './Map.presenter';

import { useMap, usePosition, usePath } from 'hooks';
import { Axios } from 'api/request';

import { ICoords } from './Map.entity';
import { useStore } from 'store';

const MapContainer = () => {
  const [goalCoords, setGoalCoords] = React.useState<ICoords>({} as ICoords);
  const currentCoords = usePosition();
  const placeCache = React.useRef(new Map());
  const {
    placeStore: { placeAddress },
  } = useStore();

  const {
    data,
    isError,
    isLoading: isPathLoading,
  } = usePath({
    startLat: currentCoords.lat,
    startLng: currentCoords.lng,
    goalLat: goalCoords.lat,
    goalLng: goalCoords.lng,
  });
  const { isLoading: isMapLoading } = useMap(data, currentCoords);

  React.useEffect(() => {
    // place의 좌표값을 불러온다. api 요청
    // 좌표값 불러오는 프로세스 삭제해도 됨.
    const getGoalCoords = async () => {
      if (!placeAddress) return;
      const cacheData = placeCache.current.get(placeAddress);

      if (!cacheData) {
        const encodedQuery = encodeURIComponent(placeAddress);
        const { data } = await Axios.get(
          `/api/map/coords?query=${encodedQuery}`
        );

        placeCache.current.set(placeAddress, data[0]);
        setGoalCoords({ lat: data[0].y, lng: data[0].x });
      } else {
        setGoalCoords({ lat: cacheData.y, lng: cacheData.x });
      }
    };
    getGoalCoords();
  }, [placeAddress]);

  return (
    <>
      <MapPresenter isLoading={isPathLoading || isMapLoading} />
    </>
  );
};

export default observer(MapContainer);
