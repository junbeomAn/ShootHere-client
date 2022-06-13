import * as React from 'react';
import { SWRConfig } from 'swr';

import FutsalAppPresenter from './FutsalApp.presenter';

import { client } from 'api/client';
import { getPlaceSearchQuery } from 'api/query';
import { Axios } from 'api/request';
import { UserContext } from 'context/userContext';
import { usePosition } from 'hooks';
import { debounce, userUtils } from 'utils';

import { IFilterState } from './FutsalApp.entity';
import { IPlace } from '../PlaceItem/PlaceItem.entity';
import { ISaveRef } from 'components/Login/Login.entity';
import FutsalAppReducer from './FutsalApp.reducer';

const swrGlobalOptions = {
  revalidateOnFocus: false,
  dedupingInterval: 1000000,
};

const { useState, useContext, useReducer, useEffect } = React;

const initialState: IFilterState = {
  filter: 'init',
};

const FutsalAppContainer = () => {
  // hook으로 빼는건 ..? usePlaces
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const [currentCity, setCurrentCity] = useState('');
  const { lat, lng } = usePosition();
  const [{ filter }, dispatch] = useReducer(FutsalAppReducer, initialState);

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
        setData(data);
        dispatch({ type: 'INIT' });
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const getCurrentCity = async (lat: number, lng: number) => {
    // useAxios 대체가능
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

  const isSaved = function (item: IPlace) {
    const save: ISaveRef[] = this;
    return save.find((savedItem) => savedItem._ref === item._id);
  };

  const getDataByFilter = (data: IPlace[], filter: string) => {
    if (filter === 'saved') {
      return data.filter(isSaved, user.save);
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
