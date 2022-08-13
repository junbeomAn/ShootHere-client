import { useState, useEffect, useRef } from 'react';
import useSWR from 'swr';

import { getFetcher } from './swrFetcher';
import color from '../commonStyles/color';
import {
  IPathCoords,
  ICoordsArray,
  ICoords,
  IUsePathResponse,
} from './hooks.entity';
import useMounted from './useMounted';

export const usePath = (coords: IPathCoords): IUsePathResponse => {
  const { startLng, startLat, goalLng, goalLat } = coords;
  const pathKey = `/api/map/path?start=${startLng},${startLat}&goal=${goalLng},${goalLat}`;

  const { data, error } = useSWR(goalLng ? pathKey : null, (key) =>
    getFetcher(key)
  );
  const isLoading = !goalLng || data ? false : true;

  return {
    isError: error,
    isLoading,
    data: data || [],
  };
};

export const usePosition = () => {
  const [currentCoords, setCurrentCoords] = useState<ICoords>({} as ICoords);
  const mountedRef = useMounted();

  useEffect(() => {
    const initCurrentPosition = () => {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        const mounted = mountedRef.current;
        if (!currentCoords.lat && mounted) {
          setCurrentCoords({ lat: latitude, lng: longitude });
        }
      });
    };
    initCurrentPosition();
  }, []);

  return { ...currentCoords };
};

export const useMap = (path: ICoordsArray, coords: ICoords) => {
  const [isLoading, setIsLoading] = useState(false);

  let map: naver.maps.Map = null;

  useEffect(() => {
    const initializeMap = () => {
      map = new naver.maps.Map('map', {
        center: new naver.maps.LatLng(coords.lat, coords.lng),
        zoom: 14,
      });

      const { x, y } = map.getCenter();

      if (x === 0 && y === 0) {
        setIsLoading(true);
        return;
      } else {
        setIsLoading(false);
      }

      new naver.maps.Circle({
        center: new naver.maps.LatLng(coords.lat, coords.lng),
        map,
        radius: 35,
        strokeColor: color.errorRed,
        fillColor: color.errorRed,
      });
      new naver.maps.Circle({
        center: new naver.maps.LatLng(coords.lat, coords.lng),
        map,
        radius: 70,
        strokeColor: color.errorRed,
        fillColor: color.errorRed,
        fillOpacity: 0.2,
      });

      const polyline = new naver.maps.Polyline({
        map,
        path,
        strokeWeight: 4,
        strokeColor: color.deepBlue,
      });
      if (path.length === 0) return;

      // const [startLng, startLat] = path.at(0);
      const [goalLng, goalLat] = path.at(-1);

      const goalMarker = new naver.maps.Marker({
        position: new naver.maps.LatLng(goalLat, goalLng),
        map,
        title: '도착',
      });
    };

    initializeMap();
  }, [path, coords]);

  return { isLoading };
};
