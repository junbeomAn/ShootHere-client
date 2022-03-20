import * as React from 'react';

import { ICoords } from './Map.entity';
import { useMap, usePosition, usePath } from '../hooks';
import { PlaceContext } from '../context/placeContext';
import MapPresenter from './Map.presenter';
import { Axios } from '../api/request';

const MapContainer: React.FunctionComponent = () => {
  const [goalCoords, setGoalCoords] = React.useState<ICoords>({} as ICoords);
  const currentCoords = usePosition();
  const placeCache = React.useRef(new Map());
  const place = React.useContext(PlaceContext);
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
      if (!place) return;
      const cacheData = placeCache.current.get(place);

      if (!cacheData) {
        const encodedQuery = encodeURIComponent(place);
        const { data } = await Axios.get(
          `/api/map/coords?query=${encodedQuery}`
        );

        placeCache.current.set(place, data);
        setGoalCoords({ lat: data.y, lng: data.x });
      } else {
        setGoalCoords({ lat: cacheData.y, lng: cacheData.x });
      }
    };
    getGoalCoords();
  }, [place]);

  return (
    <>
      <MapPresenter isLoading={isPathLoading || isMapLoading} />
    </>
  );
};

export default MapContainer;
