import * as React from 'react';
import { SWRConfig } from 'swr';

import FutsalAppPresenter from './FutsalApp.presenter';

import { client } from '../api/client';
import { getPlaceSearchQuery } from '../api/query';
import { Axios } from '../api/request';
import { UserContext } from '../context/userContext';
import { IFilterState, IDataAction } from './FutsalApp.entity';
import { dataActions } from './FutsalApp.actions';
import { IPlace } from '../PlaceItem/PlaceItem.entity';
import { usePosition } from '../hooks';
import { debounce, userUtils } from '../utils/';

const swrGlobalOptions = {
  revalidateOnFocus: false,
  dedupingInterval: 1000000,
};

const { useState, useContext, useReducer, useEffect } = React;

const initialState: IFilterState = {
  filter: 'init',
};

const reducer = (state: IFilterState, action: IDataAction): IFilterState => {
  switch (action.type) {
    case dataActions.SAVED:
      return {
        ...state,
        filter: 'saved',
      };
    case dataActions.INIT:
      return {
        ...state,
        filter: 'init',
      };
    default:
      return state;
  }
};

const FutsalAppContainer = () => {
  // hook으로 빼는건 ..? usePlaces
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const [currentCity, setCurrentCity] = useState('');
  const { lat, lng } = usePosition();
  const [{ filter }, dispatch] = useReducer(reducer, initialState);

  const { user, setUser } = useContext(UserContext);

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentQuery = e.target.value || currentCity;
    debounce(getPlaces, currentQuery);
  };

  const getPlaces = (query: string) => {
    if (!query) return;

    setIsLoading(true);
    client
      .fetch(getPlaceSearchQuery(query))
      .then((data) => {
        dispatch({ type: 'INIT' });
        // 전체 데이터의 상태관리와 현재 불러올 상태관리 데이터를 분리.
        // 전체 데이터를 위도 경도로 이용한 직선거리 순으로 정렬.
        // 현재 불러올 데이터는 10~20개씩 가져온다.
        setData(data);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const getCurrentCity = async (lat: number, lng: number) => {
    if (!lat || !lng) return;
    const url = `/api/map/address?lat=${lat}&lng=${lng}`;
    try {
      const { data: address } = await Axios.get<string>(url);
      console.log(address);
      setCurrentCity(address);
    } catch (err) {
      console.log(err);
      setError(err);
    }
  };

  const getDataByFilter = (data: IPlace[], filter: string) => {
    if (filter === 'saved') {
      const save = user.save;
      return data.filter((item) =>
        save.find((savedItem) => savedItem._ref === item._id)
      );
    } else {
      return data;
    }
  };

  useEffect(() => {
    const localUser = userUtils.getUser();
    if (localUser) {
      client.getDocument(localUser._id).then((user) => {
        const { _type, _id, userName, save } = user;
        const userInfo = { _type, _id, userName, save };
        setUser(userInfo);
        userUtils.setUser(userInfo);
      });
    }
  }, []);

  useEffect(() => {
    getCurrentCity(lat, lng);
  }, [lat, lng]);

  useEffect(() => {
    getPlaces(currentCity);
  }, [currentCity]);

  const filteredData = React.useMemo(
    () => getDataByFilter(data, filter),
    [data, filter]
  );

  return (
    <>
      <SWRConfig value={swrGlobalOptions}>
        <FutsalAppPresenter
          onChange={onSearchChange}
          dispatch={dispatch}
          data={filteredData}
          filter={filter}
          isLoading={isLoading}
        />
      </SWRConfig>
    </>
  );
};

export default FutsalAppContainer;
